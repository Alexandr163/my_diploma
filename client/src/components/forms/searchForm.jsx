import React, { useState } from "react";
import PropTypes from "prop-types";

const SearchForm = ({ onSearch }) => {
    const [value, setValue] = useState("");

    const handleChangeValue = ({ target }) => {
        setValue(target.value);
    };

    return (
        <div className="input-group mb-3 w-50 mx-auto">
            <input
                type="text"
                className="form-control"
                placeholder="Найти..."
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                onChange={handleChangeValue}
                value={value}
            />
            <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={() => onSearch(value)}
            >
                <i className="bi bi-search" />
            </button>
        </div>
    );
};

SearchForm.propTypes = {
    onSearch: PropTypes.func
};

export default SearchForm;
