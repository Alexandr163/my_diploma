import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        entities: null,
        error: null,
        isAuth: false,
        isLoading: false
    },
    reducers: {
        authRequest: (state, action) => {
            state.isLoading = true;
        },
        authRequestFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        authReceived: (state, action) => {
            state.isAuth = true;
            state.entities = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        logOutRequest: (state, action) => {
            state.entities = null;
            state.isAuth = false;
            state.error = null;
            state.isLoading = false;
        }
    }
});

const { reducer: authReducer, actions } = authSlice;
const { authRequest, authRequestFailed, authReceived, logOutRequest } = actions;

const logOutRequestFailed = createAction("auth/logOutRequestFailed");

export const signOut = () => (dispatch) => {
    try {
        dispatch(logOutRequest());
    } catch (error) {
        dispatch(logOutRequestFailed("Error with logOut"));
    }
};

export const signIn = (email, pass) => async (dispatch) => {
    dispatch(authRequest());
    try {
        const authUser = await authService.signIn(email, pass);
        if (authUser) {
            dispatch(authReceived(authUser));
        } else {
            dispatch(authRequestFailed("User not found"));
        }
    } catch (error) {
        dispatch(authRequestFailed(error.message));
    }
};

export const getIsAuth = () => (state) => state.auth.isAuth;

export default authReducer;
