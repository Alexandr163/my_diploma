import React from "react";
import { useLocation } from "react-router-dom";
// import PropTypes from "prop-types";

const ProductPage = () => {
    const { state } = useLocation();
    const { product } = state;

    console.log("---product.image---", product.image);

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <img src={"./src/img/" + product.image} />
                        <h3>{product.name}</h3>
                        <p>{product.price} руб</p>
                        <button className="btn btn-outline-success btn-sm"><i className="bi bi-plus" /></button>
                    </div>
                </div>
            </div>
        </>
    );
};

// ProductPage.propTypes = {
//     product: PropTypes.object
// };

export default ProductPage;
