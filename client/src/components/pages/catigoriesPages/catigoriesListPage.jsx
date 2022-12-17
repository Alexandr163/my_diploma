import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCategories } from "../../../store/categories";
import ProductsListPage from "../productsPages/productsListPage";

const CategoriesListPage = () => {
    const { categoryId } = useParams();
    const categories = useSelector(getCategories());
    console.log(categoryId, categories);

    let renderData = null;

    if (categoryId) {
        renderData = <ProductsListPage categoryId={categoryId} />;
    } else {
        if (categories) {
            renderData = (
                <>
                    {categories.map((item) => (
                        <div key={item._id}>
                            <Link
                                className="nav-link mt-2 px-2"
                                to={`/categories/${item._id}`}
                            >
                                {item.title}
                            </Link>
                        </div>
                    ))}
                </>
            );
        } else {
            renderData = (
                <>
                    <h1>Loading...</h1>
                </>
            );
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <>{renderData}</>
                </div>
            </div>
        </div>
    );
};

export default CategoriesListPage;
