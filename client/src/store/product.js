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
        },
        receivedUpdateProducts: (state, action) => {
            console.log("---action", action.payload);

            const indexUpdate = state.entities.findIndex((item) => {
                console.log(item._id, action.payload._id);
                console.log(typeof item._id, typeof action.payload._id);
                return item._id === action.payload._id;
            });

            console.log("---indexUpdate", indexUpdate);

            if (indexUpdate !== -1) {
                state.entities[indexUpdate] = action.payload;
            }

            state.isLoading = false;
        },

        requestUpdateProducts: (state, action) => {
            state.isLoading = true;
        },
        requestUpdateProductsFailed: (state, action) => {
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
    requestCreatedProductsFailed,
    receivedUpdateProducts,
    requestUpdateProducts,
    requestUpdateProductsFailed
} = actions;

export const getPoducts = () => (state) => state.products.entities;

export const getProductsListByCategoriesId = (categoryId) => (state) =>
    state.products.entities.filter(
        (item) => String(item.categoriesId) === String(categoryId)
    );

export const getPoductById = (id) => (state) =>
    state.products.entities.find((item) => item._id === id);

export const createdProduct = (item) => async (dispatch) => {
    dispatch(requestCreatedProducts());
    try {
        dispatch(receivedCreatedProducts(item));
    } catch (error) {
        dispatch(requestCreatedProductsFailed(error.message));
    }
};

export const updateProduct = (item) => async (dispatch) => {
    dispatch(requestUpdateProducts());
    try {
        dispatch(receivedUpdateProducts(item));
    } catch (error) {
        dispatch(requestUpdateProductsFailed(error.message));
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
