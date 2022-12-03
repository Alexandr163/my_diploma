import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuth, signIn } from "../../store/authSlice";
import { validator } from "../../utils/validator";
import TextField from "../forms/textField";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const isAuth = useSelector(getIsAuth());
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    useEffect(() => {
        if (isAuth) {
            navigate("/");
        }
    }, [isAuth]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        dispatch(signIn(data.email, data.password));
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <TextField
                            label="Пароль"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <button
                            className="btn btn-primary w-100 mx-auto"
                            type="submit"
                            disabled={!isValid}
                        >
                            Submit
                        </button>

                        <div>
                            <Link className="nav-link " aria-current="page" to="/register">Зарегистрироваться</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
