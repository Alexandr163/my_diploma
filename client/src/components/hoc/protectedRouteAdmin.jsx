import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { getIsAuth, getisAuthAdmin } from "../../store/authSlice";
import PropTypes from "prop-types";

const ProtectedRouteAdmin = ({ children }) => {
    const location = useLocation();
    const isAuth = useSelector(getIsAuth());
    const isAuthAdmin = useSelector(getisAuthAdmin());

    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if (!isAuthAdmin) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return children;
};

ProtectedRouteAdmin.propTypes = {
    children: PropTypes.object
};

export default ProtectedRouteAdmin;
