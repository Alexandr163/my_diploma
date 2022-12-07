import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Login from "./layouts/login";
import Main from "./layouts/main";
import Categories from "./layouts/categories";
import NavBar from "./components/ui/navBar";
import CartPage from "./components/pages/cartPage/cartPage";
import ProductPage from "./components/pages/productsPages/productPage";
import LogOut from "./components/logOut";
import RegisterForm from "./components/ui/registerForm";
import "bootstrap/dist/css/bootstrap.css";
import ProtectedRoute from "./components/hoc/protectedRoute";
import { useDispatch } from "react-redux";
import localStorageService from "./services/localStorage.service";
import { authReceivedAction } from "./store/authSlice";
import { loadCart } from "./store/cart";

function App() {
    const dispatch = useDispatch();
    const authUser = localStorageService.getAuthUser();
    const authAction = authReceivedAction();
    if (authUser) {
        dispatch(authAction(authUser));
        dispatch(loadCart());
    }
    return (
        <div>
            <NavBar />
            <Routes>
                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <CartPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/product/:productId" element={<ProductPage />} />
                <Route
                    path="/categories/:categoriesId"
                    element={<Categories />}
                />
                <Route path="/categories" element={<Categories />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<LogOut />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/" element={<Main />} />
                <Route element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;
