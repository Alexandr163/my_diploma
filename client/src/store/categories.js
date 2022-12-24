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
            state.entities.push(action.payload);
            state.isLoading = false;
        },

        requestUpdatedCatigory: (state, action) => {
            state.isLoading = true;
        },
        requestUpdatedCatigoryFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        receivedUpdatedCatigory: (state, action) => {
            const index = state.entities.findIndex(
                (item) => item._id === action.payload._id
            );

            if (index !== -1) {
                state.entities[index] = action.payload;
            } else {
                state.error = `Категория с id ${action.payload._id} не найден в редакс. Обновление не произведено.`;
            }

            state.isLoading = false;
        },
        receivedRemoveCatigory: (state, action) => {
            state.entities = state.entities.filter(
                (item) => item._id !== action.payload._id
            );
            state.isLoading = false;
        },

        requestRemoveCatigory: (state, action) => {
            state.isLoading = true;
        },
        requestRemoveCatigoryFailed: (state, action) => {
            state.error = action.payload;
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
    receivedCreatedCatigories,
    requestUpdatedCatigory,
    receivedUpdatedCatigory,
    requestUpdatedCatigoryFailed,
    receivedRemoveCatigory,
    requestRemoveCatigory,
    requestRemoveCatigoryFailed
} = actions;

export const getCategories = () => (state) => state.categories.entities;

export const createCategory = (category) => async (dispatch) => {
    dispatch(requestCreatedCatigories());
    try {
        const data = await categoriesService.create(category);

        dispatch(receivedCreatedCatigories(data));
    } catch (error) {
        dispatch(requestCreatedCatigoriesFailed(error.message));
    }
};

export const updateCategory = (category) => async (dispatch) => {
    dispatch(requestUpdatedCatigory());
    try {
        const data = await categoriesService.update(category);

        dispatch(receivedUpdatedCatigory(data));
    } catch (error) {
        dispatch(requestUpdatedCatigoryFailed(error.message));
    }
};

export const removeCategory = (item) => async (dispatch) => {
    dispatch(requestRemoveCatigory());
    try {
        await categoriesService.delete(item);
        dispatch(receivedRemoveCatigory(item));
    } catch (error) {
        dispatch(requestRemoveCatigoryFailed(error.message));
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

export const getCategoryById = (id) => (state) =>
    state.categories.entities.find((item) => String(item._id) === String(id));

export default reducerCategories;
