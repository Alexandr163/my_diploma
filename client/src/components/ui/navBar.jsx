import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getIsAuth } from "../../store/authSlice";

const NavBar = () => {
    const isAuth = useSelector(getIsAuth());

    return (
        <nav className="navbar bg-light mb-3">
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
                    <Link className="nav-link " aria-current="page" to="/cart">
                        Корзина
                    </Link>

                    {!isAuth ? (
                        <Link
                            className="nav-link "
                            aria-current="page"
                            to="/login"
                        >
                            Вход/Регистрация
                        </Link>
                    ) : (
                        <Link
                            className="nav-link "
                            aria-current="page"
                            to="/logout"
                        >
                            Выход
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
