import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getIsAuth } from "../../store/authSlice";

const NavBar = () => {
    const isAuth = useSelector(getIsAuth());

    return (
        <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-[#ecc8c9]">
            <span>
                <Link className="ml-7 text-[#8b9e93]" to="/">
                    Главная
                </Link>

                <Link className="ml-7 text-[#8b9e93]" to="/categories">
                    Категории
                </Link>

                <Link className="ml-7 text-[#8b9e93]" to="/cart">
                    Корзина
                </Link>
            </span>
            <span>
                {!isAuth ? (
                    <Link className="ml-5 text-[#8b9e93]" to="/login">
                        Вход/Регистрация
                    </Link>
                ) : (
                    <Link className="ml-5 text-[#8b9e93]" to="/logout">
                        Выход
                    </Link>
                )}
            </span>
        </nav>
    );
};

export default NavBar;
