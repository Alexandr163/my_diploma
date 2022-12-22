import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ButtonGoBack = ({ count = -1 }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(count);
    };

    return (
        <button
            className="btn btn-outline-primary mb-3 btn-sm"
            onClick={handleBack}
        >
            <i className="bi bi-backspace" />
        </button>
    );
};

ButtonGoBack.propTypes = {
    count: PropTypes.number
};

export default ButtonGoBack;
