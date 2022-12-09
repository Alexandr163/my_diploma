import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { getIsAuth } from "../../store/authSlice";
import PropTypes from "prop-types";
import { getCategories } from "../../store/categories";

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const isAuth = useSelector(getIsAuth());
    const categories = useSelector(getCategories());
    const products = useSelector(getCategories());

    console.log(isAuth, categories, products);
    if (!isAuth || categories.length === 0 || products.length === 0) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.object
};

export default ProtectedRoute;
