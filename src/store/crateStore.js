import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducerProducts from "./product";
import reducerCategories from "./categories";

const rootReducer = combineReducers({
    products: reducerProducts,
    categories: reducerCategories
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
