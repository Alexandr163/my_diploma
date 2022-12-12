import React from "react";
import SearchForm from "../components/forms/searchForm";
import { useSelector } from "react-redux";
import { getPoducts } from "../store/product";
import { Link } from "react-router-dom";
import useSearch from "../components/hooks/useSearch";

const Main = () => {
    const products = useSelector(getPoducts());
    const { handleSearch, newProducts } = useSearch(products);

    return (
        <>
            <h1 className="text-center">Main Page</h1>
            <SearchForm onSearch={handleSearch} />
            {newProducts.length > 0 ? (
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            {newProducts.map((item) => (
                                <div key={item._id}>
                                    <div className="d-flex justify-content-between">
                                        <Link
                                            className="nav-link mt-2 px-2"
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
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Main;
