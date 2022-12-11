import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getProductsListByCategoriesId } from "../../../store/product";
import ButtonGoBack from "../../forms/buttonGoBack";
import { useSelector } from "react-redux";

const ProductsListPage = ({ categoryId }) => {
    const productsList = useSelector(getProductsListByCategoriesId(categoryId));
    const [toggle, setToggle] = useState(true);

    function compare(a, b) {
        if (Number(a.price) > Number(b.price)) {
            return -1;
        }
        if (Number(a.price) < Number(b.price)) {
            return 1;
        }

        return 0;
    }

    function sortProductsList() {
        productsList.sort(compare);
    }

    if (toggle) {
        sortProductsList();
    }

    const handleSort = () => {
        setToggle((prev) => !prev);
        sortProductsList();
    };

    return (
        <>
            <div className="d-flex justify-content-between">
                <ButtonGoBack />
                <button
                    className={`bi bi-sort-down${
                        toggle ? "" : "-alt"
                    } btn btn-outline-primary mb-3 btn-sm`}
                    onClick={handleSort}
                ></button>
            </div>
            {productsList.map((item) => (
                <div key={item._id}>
                    <div className="d-flex justify-content-between">
                        <Link
                            className="nav-link px-2"
                            to={`/product/${item._id}`}
                        >
                            {item.title}
                        </Link>
                        <div className="d-flex align-items-center">
                            {item.price}
                        </div>
                    </div>
                    <hr className="m-0" />
                </div>
            ))}
        </>
    );
};

ProductsListPage.propTypes = {
    categoryId: PropTypes.string
};

export default ProductsListPage;
