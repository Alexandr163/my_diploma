import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addProductInCart,
    deleteProductFromCart,
    getCart,
    removePositionFromCart
} from "../../../store/cart";

const CartPage = () => {
    const cart = useSelector(getCart());
    const dispatch = useDispatch();

    const turnCart = [];

    for (const item of cart) {
        const turnItem = turnCart.find((el) => el._id === item._id);

        if (turnItem) {
            turnItem.count += 1;
            turnItem.totalPrice += Number(item.price);
        } else {
            turnCart.push({
                ...item,
                count: 1,
                price: Number(item.price),
                totalPrice: Number(item.price)
            });
        }
    }

    const total = { Count: 0, Price: 0 };
    for (const item of turnCart) {
        total.Count += item.count;
        total.Price += item.totalPrice;
    }

    const handleAddToCart = (product) => {
        dispatch(addProductInCart(product));
    };
    const handleDeleteFromCart = (product) => {
        dispatch(deleteProductFromCart(product));
    };
    const handleTotalRemoveFromCart = (id) => {
        dispatch(removePositionFromCart(id));
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {turnCart.map((item, idx) => {
                        return (
                            <div className="d-flex mb-3" key={Date.now() + idx}>
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() =>
                                            handleTotalRemoveFromCart(item._id)
                                        }
                                    >
                                        <i className="bi bi-x"></i>
                                    </button>
                                </div>
                                <div className="me-auto ms-2">{`${item.title} - ${item.price}`}</div>
                                <div
                                    className="btn-group"
                                    role="group"
                                    aria-label="Basic outlined example"
                                >
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() =>
                                            handleDeleteFromCart(item)
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
                    <hr />
                    <div>
                        {`Итого: колличество (${total.Count}) стоимость (${total.Price})`}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
