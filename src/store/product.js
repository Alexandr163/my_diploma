import { createSlice } from "@reduxjs/toolkit";
import productsService from "../services/products.service";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        entities: null,
        isLoading: false,
        error: null
    },
    reducers: {
        receivedProducts: (state, action) => {
            state.entities = action.payload;
            state.error = null;
            state.isLoading = false;
        },

        requestProducts: (state, action) => {
            state.entities = null;
            state.error = null;
            state.isLoading = true;
        },
        requestProductsFailed: (state, action) => {
            state.entities = null;
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: reducerProducts, actions } = productsSlice;
const { receivedProducts, requestProducts, requestProductsFailed } = actions;

export const getPoducts = () => (state) => state.products.entities;

export const fetchProducts = () => async (dispatch) => {
    dispatch(requestProducts());
    try {
        const data = await productsService.fetchProducts();
        dispatch(receivedProducts(data));
    } catch (error) {
        dispatch(requestProductsFailed(error.message));
    }
};

export default reducerProducts;
