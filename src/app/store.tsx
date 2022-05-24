import { 
    configureStore
} from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";

const middlewares: any[] = [];

if (process.env.NODE_ENV === "development") {
    const { createLogger } = require(`redux-logger`);
    const logger = createLogger({ collapsed: (getState: any, action: any, logEntry: any) => !logEntry.error });

    middlewares.push(logger);
}

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(middlewares),
    devTools: process.env.NODE_ENV === "development",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;