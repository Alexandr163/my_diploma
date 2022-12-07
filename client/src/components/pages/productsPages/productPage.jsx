import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { addProductInCart, removeProductFromCart } from "../../../store/cart";
// import PropTypes from "prop-types";

const ProductPage = () => {
    const { state } = useLocation();
    const { product } = state;
    const dispatch = useDispatch();

    console.log("---product.image---", product.image);

    const handleAddToCart = () => {
        dispatch(addProductInCart(product));
    };
    const handleRemoveFromCart = () => {
        dispatch(removeProductFromCart(product));
    };

    return (
        <>
            <div className="">
                <div className="card col-4">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        {/* <div className="container mt-5">
                        <div className="row">
                            <div className="col-md-6 offset-md-3 shadow p-4"> */}
                        <h3>{product.name}</h3>
                        <button
                            className="btn btn-primary me-1"
                            onClick={handleAddToCart}
                        >
                            Add
                        </button>
                        <button
                            className="btn btn-primary ms-1"
                            onClick={handleRemoveFromCart}
                        >
                            Remove
                        </button>
                        {/* <img src={product.image}></img> */}
                        {/* </div>
                        </div>
                    </div> */}
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
