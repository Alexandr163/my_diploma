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

    const turnCart = [];

    for (const item of cart) {
        const turnItem = turnCart.find((el) => el._id === item._id);

        if (turnItem) {
            if ("count" in turnItem) {
                turnItem.count += 1;
            } else {
                turnItem.count = 1;
            }
        } else {
            turnCart.push({ ...item, count: 1 });
        }
    }

    const handleAddToCart = (product) => {
        dispatch(addProductInCart(product));
    };
    const handleRemoveFromCart = (product) => {
        dispatch(removeProductFromCart(product));
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {turnCart.map((item, idx) => {
                        return (
                            <div className="d-flex mb-3" key={Date.now() + idx}>
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
                                        onClick={() => handleAddToCart(item)}
                                    >
                                        +
                                        <span
                                            className={
                                                item.count
                                                    ? "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                                    : null
                                            }
                                        >
                                            {item.count}
                                            <span className="visually-hidden">
                                                unread messages
                                            </span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CartPage;
