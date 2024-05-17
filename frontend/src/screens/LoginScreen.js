import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../actions/userActions";
import Loader from "../components/Loader.js";
import ErrorComponent from "../components/ErrorComponent.js";

function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const redirect = window.location.search ? window.location.search.split("=")[1] : "/";
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            const goToHomePage = () => navigate('/');
            goToHomePage()
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(username, password));
    };

    return (
        <div className="login">
            <div className="container">
                <h1 className="heading">Sign in</h1>
                    {
                        loading ? <Loader /> :
                            error ? <ErrorComponent /> :
                            (
                                <form onSubmit={submitHandler}>
                                    <div className="field">
                                        <label htmlFor="username">Username</label>
                                        <input type="text"
                                                id="username"
                                                placeholder="Enter username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}/>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="password">Password</label>
                                        <input type="password"
                                                id="password"
                                                placeholder="Enter password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                    <div className="btn">
                                        <button>Sign in</button>
                                    </div>
                                    <p className="new">
                                        New Customer?
                                        <Link to={`/register/`}>
                                            <a class="register"> Register</a>
                                        </Link>
                                    </p>
                                </form>
                            )

                    }
            </div>
        </div>
    );
};

export default LoginScreen;
