import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import {
    addProductInCart,
    getCart
} from "../../../store/cart";

const ProductPage = () => {
    const { state } = useLocation();
    const { product } = state;
    const dispatch = useDispatch();
    const cart = useSelector(getCart());
    const isProductInCart = cart.some((p) => p._id === product._id);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        dispatch(addProductInCart(product));
    };

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <h3>{product.name}</h3>
                        {!isProductInCart ? (
                            <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={handleAddToCart}
                            >
                                Купить
                            </button>
                        ) : (
                            <Link to="/cart">
                                <button className="btn btn-outline-primary btn-sm">
                                    В корзину
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductPage;
