import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getIsAuth, getisAuthAdmin } from "../../store/authSlice";

const NavBar = () => {
    const isAuth = useSelector(getIsAuth());
    const isAuthAdmin = useSelector(getisAuthAdmin());

    return (
        <nav className="navbar bg-light">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link " aria-current="page" to="/">
                            Главная
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link "
                            aria-current="page"
                            to="/categories"
                        >
                            Категории
                        </Link>
                    </li>
                </ul>

                <div className="d-flex">
                    {!isAuth ? null : isAuthAdmin ? (
                        <Link
                            className="nav-link"
                            aria-current="page"
                            to="/admin"
                        >
                            <i className="bi bi-gear"></i>
                        </Link>
                    ) : (
                        <Link
                            className="nav-link"
                            aria-current="page"
                            to="/cart"
                        >
                            <i className="bi bi-cart4 fs-4" />
                        </Link>
                    )}

                    {!isAuth ? (
                        <Link
                            className="nav-link"
                            aria-current="page"
                            to="/login"
                        >
                            <i className="bi bi-box-arrow-in-right fs-4" />
                        </Link>
                    ) : (
                        <Link
                            className="nav-link "
                            aria-current="page"
                            to="/logout"
                        >
                            <i className="bi bi-box-arrow-left fs-4" />
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
