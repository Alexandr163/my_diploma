import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        entities: null,
        error: null,
        isAuth: false,
        isLoading: false
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

export const loadAuthUserFromLocalStorage = (user) => (dispatch) => {
    dispatch(signInReceived(user));
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

export const signIn = (email, pass) => async (dispatch) => {
    dispatch(signInRequested());
    try {
        const authUser = await authService.signIn(email, pass);

        if (authUser) {
            dispatch(signInReceived(authUser));
        } else {
            dispatch(signInRequestedFailed("User not found"));
        }

        localStorageService.setAuthUser(authUser);
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
