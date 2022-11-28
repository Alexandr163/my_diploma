import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";

const authSclice = createSlice({
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
        logoutRequest: (state, action) => {
            state.entities = null;
            state.isAuth = false;
            state.error = null;
            state.isLoading = false;
        }
    }
});

const { reducer: authReducer, actions } = authSclice;
const { authRequest, authRequestFailed, authReceived, logoutRequest } = actions;

const logoutRequestFailed = createAction("auth/logoutRequestFailed");

export const singOut = () => (dispatch) => {
    try {
        dispatch(logoutRequest());
    } catch (error) {
        dispatch(logoutRequestFailed("Error with logOut"));
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
