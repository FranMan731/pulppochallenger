import { combineReducers } from "@reduxjs/toolkit";
import search from "./searchSlice";

const appReducers = combineReducers({
    search
});

export default appReducers;
