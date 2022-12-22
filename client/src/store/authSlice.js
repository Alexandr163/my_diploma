import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        entities: null,
        error: null,
        isAuth: false,
        isLoading: false,
        isAuthAdmin: false
    },
    reducers: {
        signInRequested: (state, action) => {
            state.isLoading = true;
        },
        signInReceived: (state, action) => {
            state.isAuth = true;
            state.isAuthAdmin = action.payload.adminStatus;
            state.entities = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        signInRequestedFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        signUpRequested: (state, action) => {
            state.isLoading = true;
        },
        signUpReceived: (state, action) => {
            state.isAuth = true;
            state.entities = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        signUpRequestedFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logOutRequested: (state, action) => {
            state.entities = null;
            state.isAuth = false;
            state.isAuthAdmin = false;
            state.error = null;
            state.isLoading = false;
        }
    }
});

const { reducer: authReducer, actions } = authSlice;
const {
    signInRequested,
    signInRequestedFailed,
    signInReceived,
    logOutRequested,
    signUpRequested,
    signUpReceived,
    signUpRequestedFailed
} = actions;

const logOutRequestedFailed = createAction("auth/logOutRequestedFailed");

export const loadAuthUserFromLocalStorage =
    (dataTokens) => async (dispatch) => {
        dispatch(signInRequested());
        try {
            const { tokens, user } = await authService.signInTokens(dataTokens);

            localStorageService.setAuthUser(tokens);
            dispatch(signInReceived(user));
        } catch (error) {
            dispatch(signInRequestedFailed(error.message));
        }
    };

export const signOut = () => (dispatch) => {
    try {
        dispatch(logOutRequested());
        localStorageService.removeAuthUser();
        localStorageService.removeCart();
    } catch (error) {
        dispatch(logOutRequestedFailed("Error with logOut"));
    }
};

export const signIn = (email, password) => async (dispatch) => {
    dispatch(signInRequested());
    try {
        const { tokens, user } = await authService.signIn(email, password);

        localStorageService.setAuthUser(tokens);
        dispatch(signInReceived(user));
    } catch (error) {
        dispatch(signInRequestedFailed(error.message));
    }
};

export const signUp = (newUser) => async (dispatch) => {
    dispatch(signUpRequested());
    try {
        const { tokens, user } = await authService.signUp(newUser);

        localStorageService.setAuthUser(tokens);
        dispatch(signUpReceived(user));
    } catch (error) {
        dispatch(signUpRequestedFailed(error.message));
    }
};

export const getIsAuth = () => (state) => state.auth.isAuth;
export const getisAuthAdmin = () => (state) => state.auth.isAuthAdmin;

export default authReducer;
