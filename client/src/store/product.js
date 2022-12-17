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
            state.entities.push(action.payload);
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
            const indexUpdate = state.entities.findIndex((item) => {
                return item._id === action.payload._id;
            });

            if (indexUpdate !== -1) {
                state.entities[indexUpdate] = action.payload;
            } else {
                state.error = `Продукт с id ${action.payload._id} не найден в редакс. Обновление не произведено.`;
            }

            state.isLoading = false;
        },

        requestUpdateProducts: (state, action) => {
            state.isLoading = true;
        },
        requestUpdateProductsFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        receivedRemoveProducts: (state, action) => {
            state.entities = state.entities.filter((item) => item._id !== action.payload);
            state.isLoading = false;
        },

        requestRemoveProducts: (state, action) => {
            state.isLoading = true;
        },
        requestRemoveProductsFailed: (state, action) => {
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
    requestUpdateProductsFailed,
    receivedRemoveProducts,
    requestRemoveProducts,
    requestRemoveProductsFailed
} = actions;

export const getPoducts = () => (state) => state.products.entities;

export const getProductsListByCategoryId = (categoryId) => (state) =>
    state.products.entities.filter(
        (item) => String(item.categoriesId) === String(categoryId)
    );

export const getPoductById = (id) => (state) =>
    state.products.entities.find((item) => item._id === id);

export const createdProduct = (item) => async (dispatch) => {
    dispatch(requestCreatedProducts());
    try {
        const newProduct = await productsService.create(item);
        dispatch(receivedCreatedProducts(newProduct));
    } catch (error) {
        dispatch(requestCreatedProductsFailed(error.message));
    }
};

export const updateProduct = (item) => async (dispatch) => {
    dispatch(requestUpdateProducts());
    try {
        const updateProduct = await productsService.update(item);
        dispatch(receivedUpdateProducts(updateProduct));
    } catch (error) {
        dispatch(requestUpdateProductsFailed(error.message));
    }
};

export const removeProduct = (item) => async (dispatch) => {
    dispatch(requestRemoveProducts());
    try {
        const removeProduct = await productsService.delete(item);
        dispatch(receivedRemoveProducts(removeProduct));
    } catch (error) {
        dispatch(requestRemoveProductsFailed(error.message));
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
