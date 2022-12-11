import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { createCategory, getCategories } from "../../../store/categories";
import {
    createdProduct,
    getPoductById,
    getPoducts,
    updateProduct
} from "../../../store/product";
import ButtonGoBack from "../../forms/buttonGoBack";
import TextField from "../../forms/textField";

const AdminPage = () => {
    const init = {
        newCategoryName: "",
        productName: "",
        selectCategory: "",
        description: "",
        price: 0
    };

    const { productId } = useParams();
    const product = useSelector(getPoductById(productId));

    if (product) {
        init.productName = product.title;
        init.selectCategory = product.categoriesId;
        init.description = product.description;
        init.price = product.price;
    }

    const [data, setData] = useState(init);
    const productsList = useSelector(getPoducts());
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);
    const categoriesList = useSelector(getCategories());

    const handleChange = (el) => {
        setData((prev) => ({ ...prev, [el.name]: el.value }));
    };
    const handleSelect = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };
    const handleAddCategory = () => {
        setToggle((prev) => !prev);
    };
    const handleSaveCategory = () => {
        dispatch(createCategory(data.newCategoryName));
        setToggle((prev) => !prev);
        setData({ ...data, newCategoryName: "" });
    };
    const handleSaveProduct = () => {
        const dataProduc = {
            categoriesId: data.selectCategory,
            title: data.productName,
            description: data.description,
            image: "",
            price: data.price
        };
        if (productId) {
            dataProduc._id = productId;
            dataProduc.image = product.image;
            dispatch(updateProduct(dataProduc));
        } else {
            dispatch(createdProduct(dataProduc));
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="container mt-5">
                    <div className="row">
                        <div
                            className={`col-md-${
                                productId ? "6" : "10"
                            } offset-md-3 shadow p-4`}
                        >
                            <ButtonGoBack />
                            <div className="text-center">
                                <h3>
                                    {productId
                                        ? "Редактирование товара"
                                        : "Добавление товара"}
                                </h3>
                            </div>
                            <div>
                                <TextField
                                    type="text"
                                    name="productName"
                                    label="Название"
                                    value={data.productName}
                                    onChange={handleChange}
                                />
                                <TextField
                                    type="text"
                                    name="description"
                                    label="Описание"
                                    value={data.description}
                                    onChange={handleChange}
                                />
                                <TextField
                                    type="text"
                                    name="price"
                                    label="Стоимость"
                                    value={data.price}
                                    onChange={handleChange}
                                />
                                <div className="d-flex">
                                    <select
                                        className="form-select mb-3 w-60"
                                        aria-label=".form-select-lg example"
                                        name="selectCategory"
                                        value={data.selectCategory}
                                        onChange={handleSelect}
                                    >
                                        <option value="DEFAULT" disabled>
                                            Выбирете категорию
                                        </option>
                                        {categoriesList.map((item) => {
                                            return (
                                                <option
                                                    value={item._id}
                                                    key={item._id}
                                                >
                                                    {item.title}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary mb-3 btn-sm"
                                        onClick={handleAddCategory}
                                    >
                                        Добавить
                                    </button>
                                </div>
                                {toggle ? (
                                    <div className="d-flex justify-content-center mb-3">
                                        <TextField
                                            type="text"
                                            name="newCategoryName"
                                            label="Категория"
                                            value={data.newCategoryName}
                                            onChange={handleChange}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary my-4 btn-sm"
                                            onClick={handleSaveCategory}
                                        >
                                            Сохранить
                                        </button>
                                    </div>
                                ) : null}
                                <div className="d-flex justify-content-center mt-3">
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={handleSaveProduct}
                                    >
                                        Сохранить товар
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {productId ? null : (
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-md-8 offset-md-2 shadow p-4">
                                <div>
                                    <div className="d-flex justify-content-center mb-3">
                                        <div>
                                            <h2 className="text-center">
                                                Список Товаров
                                            </h2>
                                            <hr width="270px" />
                                        </div>
                                    </div>
                                    {productsList.map((item) => {
                                        return (
                                            <div key={item._id}>
                                                <div className="d-flex justify-content-between">
                                                    <Link
                                                        className="nav-link mt-2 px-2"
                                                        to={`/product/${item._id}`}
                                                        state={{
                                                            product: item
                                                        }}
                                                    >
                                                        {item.title}
                                                    </Link>
                                                    <div className="d-flex align-items-center">
                                                        {item.price}
                                                    </div>
                                                </div>
                                                <hr className="m-0" />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AdminPage;
