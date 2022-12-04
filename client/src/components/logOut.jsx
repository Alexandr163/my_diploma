// import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../store/authSlice";

const LogOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("---LogOut - useEffect---");
        dispatch(signOut());
        navigate("/");
    }, []);

    return null;
};

export default LogOut;
