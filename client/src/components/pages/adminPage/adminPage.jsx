import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, getCategories } from "../../../store/categories";
import { createdProduct, getPoducts } from "../../../store/product";
import TextField from "../../forms/textField";

const AdminPage = () => {
    const [data, setData] = useState({
        newCategoryName: "",
        productName: "",
        selectCategory: ""
    });
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
        dispatch(
            createdProduct({
                categoriesId: data.selectCategory,
                title: data.productName
            })
        );
    };

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <div className="text-center">
                            <h3>Добавление товара</h3>
                        </div>
                        <div>
                            <TextField
                                type="text"
                                name="productName"
                                label="Название"
                                value={data.productName}
                                onChange={handleChange}
                            />
                            <div>
                                <select
                                    className="form-select form-select-lg mb-3"
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
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={handleAddCategory}
                                >
                                    Добавить категорию
                                </button>
                            </div>
                            {toggle ? (
                                <div>
                                    <TextField
                                        type="text"
                                        name="newCategoryName"
                                        label="Категория"
                                        value={data.newCategoryName}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={handleSaveCategory}
                                    >
                                        Сохранить
                                    </button>
                                </div>
                            ) : null}
                            <div className="d-flex justify-content-end">
                                <button onClick={handleSaveProduct}>
                                    Сохранить товар
                                </button>
                            </div>
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
                                            <h5>{item.title}</h5>
                                            <hr />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminPage;
