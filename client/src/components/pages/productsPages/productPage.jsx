import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getIsAuth } from "../../../store/authSlice";
import { addProductInCart, getCart } from "../../../store/cart";
import { getPoductById } from "../../../store/product";
import ButtonGoBack from "../../forms/buttonGoBack";

const ProductPage = () => {
    const { productId } = useParams();
    const product = useSelector(getPoductById(productId));
    console.log("---product", product);
    const dispatch = useDispatch();
    const cart = useSelector(getCart());
    const isProductInCart = cart.some((p) => p._id === product._id);
    const isAuth = useSelector(getIsAuth());
    const navigate = useNavigate();

    const handleAddToCart = (e) => {
        e.stopPropagation();
        dispatch(addProductInCart(product));
    };
    const handleEdit = () => {
        navigate(`/admin/${product._id}`);
    };
    console.log(product.image);
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <ButtonGoBack />
                        <button
                            className="btn btn-outline-primary mb-3 btn-sm bi bi-pencil-square"
                            onClick={handleEdit}
                        ></button>
                        <div className="">
                            <img
                                src={`/img/${product.image}`}
                                width="250px"
                                height="250px"
                            />
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
