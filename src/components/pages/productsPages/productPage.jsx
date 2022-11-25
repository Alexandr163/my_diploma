import React from "react";
import { useLocation } from "react-router-dom";
// import PropTypes from "prop-types";

const ProductPage = () => {
    const { state } = useLocation();
    const { product } = state;

    return (
        <>
            <h1>{product.name}</h1>

            <h4>{JSON.stringify(product)}</h4>
        </>
    );
};

// ProductPage.propTypes = {
//     product: PropTypes.object
// };

export default ProductPage;
