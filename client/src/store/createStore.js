import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducerProducts from "./product";
import reducerCategories from "./categories";
import authReducer from "./authSlice";
import cartReducer from "./cart";

const rootReducer = combineReducers({
    products: reducerProducts,
    categories: reducerCategories,
    auth: authReducer,
    cart: cartReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
