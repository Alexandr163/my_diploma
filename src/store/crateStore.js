import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducerProducts from "./product";
import reducerCategories from "./categories";
import authReducer from "./authSlice";

const rootReducer = combineReducers({
    products: reducerProducts,
    categories: reducerCategories,
    auth: authReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
