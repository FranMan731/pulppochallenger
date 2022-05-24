import type { NextPage } from "next";
import { useState, useEffect, useCallback } from "react";
//Components
import SearchAndFilter from "../components/searchAndFilter/searchAndFilter";
import Result from "../components/result/result";

//CSS
import styles from "../styles/Search.module.scss";
//Redux
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { areThereFilters, nextPage, resetFilters, resetPages, searchProperties, setFilter } from "../app/reducers/searchSlice";

const Search: NextPage = () => {
    const dispatch = useAppDispatch();
    const { search } = useAppSelector((state: any) => state.app);
    const [y, setY] = useState<any>();
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        dispatch(areThereFilters());
    }, [search.filter])

    //useEffect that check if user finish
    useEffect(() => {
        const timeFn = setTimeout(() => {
            handleRequestToApi();
        }, 300)
        
        return () =>  clearTimeout(timeFn);
    }, [search.filter.search])

    //useEffect to fetch in pagination
    useEffect(() => {
        handleRequestToApi();
    }, [search.pagination.page])

    const handlePagination = useCallback(
        (e: any) => {
            const window = e.currentTarget;

            const { scrollY, innerHeight, outerHeight } = window;

            const userScrollHeight = scrollY + innerHeight;
            const windowBottomHeight = document.documentElement.scrollHeight;
            console.log("windowBottomHeight", document.documentElement.scrollHeight);
            console.log("userScrollHeight", userScrollHeight);
            
            if (userScrollHeight === windowBottomHeight) {
                handleNextPage();
            }

            setY(window.scrollY);
        }, [y]
    )

    useEffect(() => {
        if(typeof window !== "undefined") {
            setY(window.scrollY);
        }

        window.addEventListener("scroll", handlePagination);

        return () => window.removeEventListener("scroll", handlePagination);
    }, [handlePagination])

    const handleRequestToApi = async () => {
        if (search.filter.search != "") {
            setIsFetching(true);
            await dispatch(searchProperties())
            .then(() => {
                setIsFetching(false);
            })
            .catch(() => {
                setIsFetching(false);
            });
        }
    }

    const handleOnChange = (type: string, value: any) => {
        dispatch(setFilter({type, value}))
    }

    const handleClearFilters = () => {
        dispatch(resetFilters());
    }

    const handleNextPage = () => {
        if (!isFetching) {
            dispatch(nextPage());
        }
    }

    const handleFilter = () => {
        if(search.thereAreFilters) {
            dispatch(resetPages());
            handleRequestToApi();
        }
    }

    const handleCancelFilter = () => {
        dispatch(resetFilters());
    }

    return (
        <div className={`${search.filter.search != "" ? styles.transformContainer : styles.container}`}>
            <div className={styles.main}>
                <SearchAndFilter
                    handleOnChange={handleOnChange}
                    handleClearFilters={handleClearFilters}
                    handleFilter={handleFilter}
                    handleCancelFilter={handleCancelFilter}
                />
            </div>
            <div className={styles.result}>
                <Result />
            </div>
        </div>
    );
};

export default Search;
