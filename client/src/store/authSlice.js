import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        entities: null,
        error: null,
        isAuth: false,
        isAuthAdmin: false,
        isLoading: false
    },
    reducers: {
        authRequested: (state, action) => {
            state.isLoading = true;
        },
        authReceived: (state, action) => {
            state.isAuth = true;
            state.isAuthAdmin = action.payload.adminStatus;
            state.entities = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        authRequestedFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // authAdminRequested: (state, action) => {
        //     state.isLoading = true;
        // },
        // authAdminReceived: (state, action) => {
        //     state.isAuth = true;
        //     state.isAuthAdmin = true;
        //     state.entities = action.payload;
        //     state.isLoading = false;
        //     state.error = null;
        // },
        // authAdminRequestedFailed: (state, action) => {
        //     state.isLoading = false;
        //     state.error = action.payload;
        // },
        logOutRequested: (state, action) => {
            state.entities = null;
            state.isAuth = false;
            state.isAuthAdmin = false;
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
const { authRequested, authRequestedFailed, authReceived, logOutRequested } =
    actions;

const logOutRequestedFailed = createAction("auth/logOutRequestedFailed");

export const loadAuthUserFromLocalStorage = (user) => (dispatch) => {
    dispatch(authReceived(user));
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
    dispatch(authRequested());
    try {
        const authUser = await authService.signIn(email, pass);

        if (authUser) {
            dispatch(authReceived(authUser));
        } else {
            dispatch(authRequestedFailed("User not found"));
        }

        localStorageService.setAuthUser(authUser);
    } catch (error) {
        dispatch(authRequestedFailed(error.message));
    }
};

// export const signUp =
//     ({ email, password, ...rest }) =>
//     async (dispatch) => {
//         dispatch(authRequested());
//         try {
//             const data = await authService.register({ email, password });
//             localStorageService.setTokens(data);
//             dispatch(authRequestedSuccess({ userId: data.localId }));
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
//             dispatch(authRequestedFailed(error.message));
//         }
//     };

export const getIsAuth = () => (state) => state.auth.isAuth;
export const getisAuthAdmin = () => (state) => state.auth.isAuthAdmin;

export default authReducer;
