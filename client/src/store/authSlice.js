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
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        }
    }
});

const { reducer: authReducer, actions } = authSlice;
const { authRequest, authRequestFailed, authReceived, logOutRequest } = actions;

const logOutRequestFailed = createAction("auth/logOutRequestFailed");

export function authReceivedAction() {
    return authReceived;
}

export const signOut = () => (dispatch) => {
    try {
        dispatch(logOutRequest());
        localStorageService.removeAuthUser();
        localStorageService.removeCart();
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

        localStorageService.setAuthUser(authUser);
    } catch (error) {
        dispatch(authRequestFailed(error.message));
    }
};

// export const signUp =
//     ({ email, password, ...rest }) =>
//     async (dispatch) => {
//         dispatch(authRequest());
//         try {
//             const data = await authService.register({ email, password });
//             localStorageService.setTokens(data);
//             dispatch(authRequestSuccess({ userId: data.localId }));
//             dispatch(
//                 createUser({
//                     _id: data.localId,
//                     email,
//                     rate: getRandomInt(1, 5),
//                     completedMeetings: getRandomInt(0, 200),
//                     image: `https://avatars.dicebear.com/api/avataaars/${(
//                         Math.random() + 1
//                     )
//                         .toString(36)
//                         .substring(7)}.svg`,
//                     ...rest
//                 })
//             );
//         } catch (error) {
//             dispatch(authRequestFailed(error.message));
//         }
//     };

export const getIsAuth = () => (state) => state.auth.isAuth;

export default authReducer;
