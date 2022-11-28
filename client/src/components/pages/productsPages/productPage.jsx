import React from "react";
import { useLocation } from "react-router-dom";
// import PropTypes from "prop-types";

const ProductPage = () => {
    const { state } = useLocation();
    const { product } = state;

    console.log("---product.image---", product.image);

    return (
        <>
            <div className="container">
                <h1>{product.name}</h1>

                <h4>{JSON.stringify(product)}</h4>
                <img src={product.image}></img>
            </div>
        </>
    );
};

// ProductPage.propTypes = {
//     product: PropTypes.object
// };

export default ProductPage;
