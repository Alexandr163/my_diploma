import { createSlice } from "@reduxjs/toolkit";
import categoriesService from "../services/categories.service";

const catigoriesSlice = createSlice({
    name: "categories",
    initialState: {
        entities: [],
        isLoading: true,
        error: null
    },
    reducers: {
        receivedCatigories: (state, action) => {
            state.entities = action.payload;
            state.error = null;
            state.isLoading = false;
        },

        requestCatigories: (state, action) => {
            state.isLoading = true;
        },
        requestCatigoriesFailed: (state, action) => {
            state.entities = [];
            state.error = action.payload;
            state.isLoading = false;
        },
        requestCreatedCatigories: (state, action) => {
            state.isLoading = true;
        },
        requestCreatedCatigoriesFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        receivedCreatedCatigories: (state, action) => {
            state.entities.push({ _id: Date.now(), title: action.payload });
            state.isLoading = false;
        }
    }
});

const { reducer: reducerCategories, actions } = catigoriesSlice;
const {
    receivedCatigories,
    requestCatigories,
    requestCatigoriesFailed,
    requestCreatedCatigories,
    requestCreatedCatigoriesFailed,
    receivedCreatedCatigories
} = actions;

export const getCategories = () => (state) => state.categories.entities;

export const createCategory = (category) => (dispatch) => {
    dispatch(requestCreatedCatigories());
    try {
        dispatch(receivedCreatedCatigories(category));
    } catch (error) {
        dispatch(requestCreatedCatigoriesFailed(error.message));
    }
};

export const fetchCategories = () => async (dispatch) => {
    dispatch(requestCatigories());
    try {
        const data = await categoriesService.fetchCategories();
        dispatch(receivedCatigories(data));
    } catch (error) {
        dispatch(requestCatigoriesFailed(error.message));
    }
};

export default reducerCategories;
