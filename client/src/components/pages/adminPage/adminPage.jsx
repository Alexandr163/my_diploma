import React from "react";
import { useSelector } from "react-redux";
import { getCategories } from "../../../store/categories";
import TextField from "../../forms/textField";

const AdminPage = () => {
    const categoriesList = useSelector(getCategories());
    console.log(JSON.stringify(categoriesList));
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
                            />
                            <div>
                                <select
                                    className="form-select form-select-lg mb-3"
                                    aria-label=".form-select-lg example"
                                    name="selectCategory"
                                >
                                    <option selected>Выбирете категорию</option>
                                    {categoriesList.map((item) => {
                                        return (
                                            <option
                                                value={item._id}
                                                key={item._id}
                                            >
                                                {item.name}
                                            </option>
                                        );
                                    })}
                                </select>
                                <button
                                    type="button"
                                    className="btn btn-outline-primary btn-sm"
                                >
                                    Добавить
                                </button>
                            </div>
                            <div>
                                <TextField
                                    type="text"
                                    name="newCategoryName"
                                    label="Категория"
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-primary btn-sm"
                                >
                                    Сохранить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminPage;
