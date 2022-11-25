import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, getPoducts } from "../../../store/product";

const ProductsListPage = ({ categoryId }) => {
    const product = useSelector(getPoducts());
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    const getProductsListByCategoriesId = (categoryId) => {
        let findeProduct = [];

        if (product) {
            findeProduct = product.filter(
                (item) => String(item.categoriesId) === String(categoryId)
            );
        }

        return findeProduct;
    };

    const productsList = getProductsListByCategoriesId(categoryId);

    return (
        <>
            {productsList.map((item) => (
                <div key={item.id}>
                    <Link className="nav-link mt-2 px-2" to={`/product/${item.id}`} state={{ product: item }}>
                        {item.name}
                    </Link>
                </div>
            ))}
        </>
    );
};

ProductsListPage.propTypes = {
    categoryId: PropTypes.string
};

export default ProductsListPage;
