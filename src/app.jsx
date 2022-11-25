import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Login from "./layouts/login";
import Main from "./layouts/main";
import Categories from "./layouts/categories";
import NavBar from "./components/ui/navBar";
import CartPage from "./components/pages/cartPage/cartPage";
import ProductPage from "./components/pages/productsPages/productPage";

function App() {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/product/:productId" element={<ProductPage />} />
                <Route
                    path="/categories/:categoriesId"
                    element={<Categories />}
                />
                <Route path="/categories" element={<Categories />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Main />} />
                <Route element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;
