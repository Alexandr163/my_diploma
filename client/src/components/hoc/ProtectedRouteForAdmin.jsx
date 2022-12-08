import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { getIsAuth } from "../../store/authSlice";
import PropTypes from "prop-types";

const ProtectedRouteForAdmin = ({ children }) => {
    const location = useLocation();
    const isAuth = useSelector(getIsAuth());
    console.log("isAuth", isAuth);
    if (isAuth === false) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return children;
};

ProtectedRouteForAdmin.propTypes = {
    children: PropTypes.object
};

export default ProtectedRouteForAdmin;
