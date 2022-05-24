import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resourceLimits } from "worker_threads";
import { fetchProperties } from "../../api/properties";
import type { RootState } from "../store";

type options = {
    label: string
    value: string
}

interface SearchState {
    options: Array<options>,
    thereAreFilters: boolean,
    filter: any,
    error: {
        status: number,
        message: string,
    },
    pagination: {
        hasMore: boolean,
        page: number,
        loadingMore: boolean,
    },
    loading: boolean,
    data: any
}

const initialState: SearchState = {
    options: [
        {
            label: "Appartment",
            value: "appartment"
        },
        {
            label: "House",
            value: "house"
        },
        {
            label: "Office",
            value: "office"
        },
        {
            label: "Land y Fincas",
            value: "land_y_fincas"
        }
    ],
    filter: {
        oldSearch: "",
        search: "",
        propertyTypes: [],
        minPrice: 0,
        maxPrice: 0,
        offset: 0,
        count: 0,
        limit: 9
    },
    thereAreFilters: false,
    error: {
        status: 0,
        message: "",
    },
    pagination: {
        hasMore: true,
        page: 0,
        loadingMore: false,
    },
    loading: false,
    data: []
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        areThereFilters: (state) => {
            const { propertyTypes, minPrice, maxPrice } = state.filter;

            state.thereAreFilters = (propertyTypes.length || minPrice || maxPrice) ? true : false;
        },
        setFilter: (state, { payload }) => {
            const { type, value } = payload;

            switch (type) {
                case "minPrice":
                case "maxPrice":
                    if (value >= 0) {
                        state.filter[type] = value;
                    }
                    break;
                case "search":
                    state.loading = true;
                    state.filter.search = value;
                    break;
                default:
                    state.filter[type] = value;
                    break;
            }
        },
        resetFilters: (state) => {
            state.filter = initialState.filter;
        },
        nextPage: (state) => {
            if (state.filter.count > state.filter.offset && !state.loading) {
                state.pagination.page += 1;
                state.filter.offset = state.filter.limit * state.pagination.page;
                state.loading = true;
            }
        },
        resetPages: (state) => {
            state.filter.offset = 0;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(searchProperties.pending, (state) => {
            state.loading = true;
            state.error = initialState.error;
        })
        builder.addCase(searchProperties.fulfilled, (state, action) => {
            state.loading = false;
            state.error = initialState.error;

            
            const { count, result } = action.payload;
            state.filter.count = count;

            const data: Array<any> = [];

            for (let i = 0; i < result.length; i++) {
                if (result[i].status === "active") {
                    const { 
                        _id,
                        address, 
                        description, 
                        operationType, 
                        pictures, 
                        price, 
                        title
                    } = result[i];
    
                    data.push({
                        _id,
                        address,
                        description,
                        operationType,
                        pictures,
                        price,
                        title
                    });
                }
            }

            if (state.filter.oldSearch !== state.filter.search || !state.filter.offset) {
                state.filter.oldSearch = state.filter.search;
                state.filter.offset = 0;
                state.data = [...data];
            } else {
                state.data = [...state.data, ...data];
            }
        })
        builder.addCase(searchProperties.rejected, (state, { payload }: any) => {
            state.loading = false;

            if (payload) {
                state.error = {
                    status: payload.status,
                    message: payload.message
                };
            } else {
                state.error = {
                    status: 500,
                    message: "There was a error with the server, please retry."
                }
            }
        })
    }
});

export const {
    areThereFilters,
    setFilter,
    resetFilters,
    nextPage,
    resetPages
} = searchSlice.actions;

export const search = (state: RootState): SearchState => state.app.search;

export const searchProperties = createAsyncThunk(
    'searchProperties', 
    async (_, { getState, rejectWithValue }: any) => {
        try {
            const search = getState().app.search;
            const { filter } = search;

            const params: Record<string, any> = {
                search: filter.search,
                limit: filter.limit,
                offset: search.pagination.page * filter.limit
            };

            if(filter.minPrice) {
                params['minPrice'] = filter.minPrice;
            }

            if(filter.maxPrice) {
                params['maxPrice'] = filter.maxPrice;
            }

            if(filter.propertyTypes.length) {
                params['propertyTypes'] = filter.propertyTypes.join(',');
            }

            const response = await fetchProperties(params);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
});

const { reducer } = searchSlice;
export default reducer;