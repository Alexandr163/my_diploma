import { createSlice } from "@reduxjs/toolkit";
import localStorageService from "../services/localStorage.service";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        entities: [],
        isloading: false,
        error: null
    },
    reducers: {
        cartLoader: (state, action) => {
            state.entities = action.payload;
        },

        productsAdded: (state, action) => {
            state.entities.push(action.payload);
        },
        productsDeleted: (state, action) => {
            const itemIndex = state.entities.findIndex(
                (item) => item._id === action.payload
            );

            if (itemIndex !== -1) {
                state.entities.splice(itemIndex, 1);
            }
        },
        positionRemoved: (state, action) => {
            const id = action.payload;

            state.entities = state.entities.filter((item) => item._id !== id);
        }
    }
});

const { reducer: cartReducer, actions } = cartSlice;
const { productsAdded, productsDeleted, cartLoader, positionRemoved } = actions;

export const addProductInCart = (product) => (dispatch, getState) => {
    dispatch(productsAdded(product));

    const cart = JSON.stringify(getState().cart.entities);
    localStorageService.setCart(cart);
};

export const deleteProductFromCart = (product) => (dispatch, getState) => {
    dispatch(productsDeleted(product._id));

    const cart = JSON.stringify(getState().cart.entities);
    localStorageService.setCart(cart);
};

export const removePositionFromCart = (id) => (dispatch, getState) => {
    dispatch(positionRemoved(id));

    const cart = JSON.stringify(getState().cart.entities);
    localStorageService.setCart(cart);
};

export const loadCart = () => (dispatch) => {
    const cart = localStorageService.getCart();

    if (cart) {
        dispatch(cartLoader(cart));
    }
};

export const getCart = () => (state) => {
    return state.cart.entities;
};

export default cartReducer;
