import { createSlice } from "@reduxjs/toolkit";
import productsService from "../services/products.service";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        entities: [],
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
            state.isLoading = true;
        },
        requestProductsFailed: (state, action) => {
            state.entities = [];
            state.error = action.payload;
            state.isLoading = false;
        },
        receivedCreatedProducts: (state, action) => {
            state.entities.push({ ...action.payload, _id: Date.now() });
            state.isLoading = false;
        },

        requestCreatedProducts: (state, action) => {
            state.isLoading = true;
        },
        requestCreatedProductsFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: reducerProducts, actions } = productsSlice;
const {
    receivedProducts,
    requestProducts,
    requestProductsFailed,
    receivedCreatedProducts,
    requestCreatedProducts,
    requestCreatedProductsFailed
} = actions;

export const getPoducts = () => (state) => state.products.entities;

export const createdProduct = (item) => async (dispatch) => {
    dispatch(requestCreatedProducts());
    try {
        dispatch(receivedCreatedProducts(item));
    } catch (error) {
        dispatch(requestCreatedProductsFailed(error.message));
    }
};

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
