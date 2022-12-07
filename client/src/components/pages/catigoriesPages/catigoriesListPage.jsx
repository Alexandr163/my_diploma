import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchCategories, getCategories } from "../../../store/categories";
import ProductsListPage from "../productsPages/productsListPage";

const CategoriesListPage = () => {
    const { categoriesId } = useParams();
    const categories = useSelector(getCategories());
    console.log(categories);
    const dispath = useDispatch();

    useEffect(() => {
        dispath(fetchCategories());
    }, []);

    let renderData = null;

    if (categoriesId) {
        renderData = <ProductsListPage categoryId={categoriesId} />;
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
                                {item.name}
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
