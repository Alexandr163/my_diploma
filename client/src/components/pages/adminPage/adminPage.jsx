import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import {
    createCategory,
    getCategories,
    getCategoryById,
    removeCategory,
    updateCategory
} from "../../../store/categories";
import {
    createdProduct,
    getPoductById,
    getPoducts,
    removeProduct,
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

    useEffect(() => {
        if (product) {
            const newData = {
                productName: product.title,
                selectCategory: product.categoryId,
                description: product.description,
                price: product.price
            };

            setData(newData);
        }
    }, [productId]);

    const [data, setData] = useState(init);
    const location = useLocation();
    const productsList = useSelector(getPoducts());
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);
    const categoriesList = useSelector(getCategories());
    const category = useSelector(getCategoryById(data.selectCategory));

    const handleChange = (el) => {
        setData((prev) => ({ ...prev, [el.name]: el.value }));
    };
    const handleSelect = (e) => {
        const { name, value } = e.target;
        const { children } = e.target;
        let newCategoryName;

        for (const item of children) {
            if (item.value === value) {
                newCategoryName = item.text;
            }
        }

        setData((prev) => ({
            ...prev,
            [name]: value,
            newCategoryName
        }));
    };
    const handleAddCategory = () => {
        setToggle((prev) => !prev);
    };

    const handleSaveCategory = () => {
        if (!data.selectCategory) {
            dispatch(createCategory(data.newCategoryName));
            setToggle((prev) => !prev);
            setData({ ...data, newCategoryName: "" });
        } else {
            dispatch(
                updateCategory({
                    _id: data.selectCategory,
                    title: data.newCategoryName
                })
            );
            setToggle((prev) => !prev);
            setData({ ...data, newCategoryName: "" });
        }
    };
    const handleEditCategory = () => {
        setToggle((prev) => !prev);
        setData({ ...data, newCategoryName: category?.title || "" });
    };
    const handleDeleteCategory = () => {
        dispatch(removeCategory(category));
    };
    const handleSaveProduct = () => {
        const dataProduct = {
            categoryId: data.selectCategory,
            title: data.productName,
            description: data.description,
            image: "",
            price: Number(data.price)
        };
        if (productId) {
            dataProduct._id = productId;
            dataProduct.image = product.image;
            dispatch(updateProduct(dataProduct));
        } else {
            dispatch(createdProduct(dataProduct));
        }
    };
    const handleDeleteProduct = () => {
        dispatch(removeProduct(product));
    };

    const isAdminForm = location.state?.adminForm;
    const isFullForm = productId && !isAdminForm;
    console.log(location.state);
    console.log(isAdminForm);

    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="container mt-5">
                    <div className="row">
                        <div
                            className={`col-md-${
                                isFullForm ? "6" : "10"
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
                                    type="number"
                                    name="price"
                                    label="Стоимость"
                                    value={data.price}
                                    onChange={handleChange}
                                />
                                <div>
                                    <select
                                        className="form-select mb-3 w-60"
                                        aria-label=".form-select-lg example"
                                        name="selectCategory"
                                        value={data.selectCategory}
                                        onChange={handleSelect}
                                    >
                                        <option value="">
                                            Новая категория
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
                                    <div
                                        className="btn-group"
                                        role="group"
                                        aria-label="Basic mixed styles outlined example"
                                    >
                                        <button
                                            type="button"
                                            className="btn btn-outline-success mb-3 btn-sm"
                                            onClick={handleAddCategory}
                                            disabled={data.selectCategory}
                                        >
                                            Добавить
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary mb-3 btn-sm"
                                            onClick={handleEditCategory}
                                            disabled={!data.selectCategory}
                                        >
                                            Редактировать
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger mb-3 btn-sm"
                                            onClick={handleDeleteCategory}
                                            disabled={!data.selectCategory}
                                        >
                                            Удалить
                                        </button>
                                    </div>
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
                                            className="btn btn-outline-success my-4 btn-sm"
                                            onClick={handleSaveCategory}
                                        >
                                            Сохранить
                                        </button>
                                    </div>
                                ) : null}
                                <div className="d-flex justify-content-center mt-3">
                                    <div
                                        className="btn-group"
                                        role="group"
                                        aria-label="Basic mixed styles outlined example"
                                    >
                                        <button
                                            type="button"
                                            className="btn btn-outline-success btn-sm"
                                            onClick={handleSaveProduct}
                                        >
                                            Сохранить товар
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={handleDeleteProduct}
                                        >
                                            Удалить товар
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isFullForm ? null : (
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
                                                        className="nav-link mt-2 px-2 bi-pencil-square"
                                                        to={`/admin/${item._id}`}
                                                        state={{
                                                            adminForm: true
                                                        }}
                                                    ></Link>
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
