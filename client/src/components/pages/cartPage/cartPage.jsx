import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addProductInCart,
    getCart,
    removeProductFromCart
} from "../../../store/cart";

const CartPage = () => {
    const cart = useSelector(getCart());
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addProductInCart(product));
    };
    const handleRemoveFromCart = (product) => {
        dispatch(removeProductFromCart(product));
    };
    const count = 1;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h1>Cart</h1>
                    {cart.map((item) => {
                        return (
                            <>
                                <div className="d-flex mb-3">
                                    <div className="me-auto">{item.name}</div>
                                    <div
                                        className="btn-group"
                                        role="group"
                                        aria-label="Basic outlined example"
                                    >
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() =>
                                                handleRemoveFromCart(item)
                                            }
                                        >
                                            -
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() =>
                                                handleAddToCart(item)
                                            }
                                        >
                                            +
                                            <span
                                                className={
                                                    count
                                                        ? "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                                        : null
                                                }
                                            >
                                                {count}
                                                <span className="visually-hidden">
                                                    unread messages
                                                </span>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <hr />
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CartPage;
