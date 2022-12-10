import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { getIsAuth } from "../../../store/authSlice";
import { addProductInCart, getCart } from "../../../store/cart";

const ProductPage = () => {
    const { state } = useLocation();
    const { product } = state;
    const dispatch = useDispatch();
    const cart = useSelector(getCart());
    const isProductInCart = cart.some((p) => p._id === product._id);
    const isAuth = useSelector(getIsAuth());

    const handleAddToCart = (e) => {
        e.stopPropagation();
        dispatch(addProductInCart(product));
    };
console.log(product.image);
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <div>
                            <img src={product.image} />
                            <h4>{product.title}</h4>
                            <span>{product.description}</span>
                            <h1>{product.price}</h1>
                        </div>
                        {!isAuth ? null : !isProductInCart ? (
                            <button
                                className="btn btn-outline-primary btn-sm mt-3"
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
