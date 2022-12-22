import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import productsService from "../../../services/products.service";
import { getIsAuth, getisAuthAdmin } from "../../../store/authSlice";
import { addProductInCart, getCart } from "../../../store/cart";
import ButtonGoBack from "../../forms/buttonGoBack";
import Loader from "../../loader";

const ProductPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState();

    useEffect(() => {
        productsService
            .getProductById(productId)
            .then((data) => setProduct(data));
    }, []);

    const dispatch = useDispatch();
    const cart = useSelector(getCart());
    const isProductInCart = cart.some((p) => p._id === product._id);
    const isAuth = useSelector(getIsAuth());
    const isAuthAdmin = useSelector(getisAuthAdmin());
    const navigate = useNavigate();

    const handleAddToCart = (e) => {
        e.stopPropagation();
        dispatch(addProductInCart(product));
    };
    const handleEdit = () => {
        navigate(`/admin/${product._id}`);
    };
    return (
        <>
            {product ? (
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <div className="btn-group">
                                <ButtonGoBack />
                                {isAuthAdmin ? (
                                    <button
                                        className="btn btn-outline-primary mb-3 btn-sm bi bi-pencil-square"
                                        onClick={handleEdit}
                                    ></button>
                                ) : null}
                            </div>
                            <div className="d-flex justify-content-between">
                                <img
                                    className="rounded float-start"
                                    src={`/img/${product.image}`}
                                    width="200px"
                                    height="200px"
                                />
                                <div className="mx-5">
                                    <h4 className="text-center">
                                        {product.title}
                                    </h4>
                                    <span className="">
                                        {product.description}
                                    </span>
                                </div>
                            </div>
                            <h5 className="text-end">{product.price} руб.</h5>

                            {!isAuth ||
                            isAuthAdmin ? null : !isProductInCart ? (
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
            ) : (
                <Loader />
            )}
        </>
    );
};

export default ProductPage;
