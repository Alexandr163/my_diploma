import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
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
                <Link className="ml-5 text-[#8b9e93]" to="/login">
                    Вход/Регистрация
                </Link>
            </span>
        </nav>
    );
};

export default NavBar;
