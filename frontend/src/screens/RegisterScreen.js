import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Import Link from React Router
import { register } from "../actions/userActions";

function RegisterScreen() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")

    const redirect = window.location.search ? window.location.search.split("=")[1] : "/";

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { userInfo } = userRegister

    useEffect(() => {
        console.log(userInfo)
        if (userInfo) {
            const goToHomePage = () => navigate('/');
            goToHomePage()
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setMessage("Password don't match")
        }
        else {
            dispatch(register(firstName, lastName, username, email, password))
        }
    }

    return(
        <div className="register">
            <div className="container">
                <h1 className="heading">Sign Up</h1>
                <form onSubmit={submitHandler}>
                        <div className="field">
                                <label htmlFor="first-name">First-name</label>
                                <input type="text"
                                        id="first-name"
                                        placeholder="Enter first-name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}/>
                            </div>
                        <div className="field">
                                <label htmlFor="last-name">Last-name</label>
                                <input type="text"
                                        id="last-name"
                                        placeholder="Enter last-name"
                                        value={lastName}
                                        onChange={(e) => setlastName(e.target.value)}/>
                            </div>
                        <div className="field">
                                <label htmlFor="username">Username</label>
                                <input type="text"
                                        id="username"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div className="field">
                                <label htmlFor="email">Email</label>
                                <input type="email"
                                        id="email"
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="field">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                        id="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="field">
                                <label htmlFor="confirm-password">confirm Password</label>
                                <input type="password"
                                        id="confirm-password"
                                        placeholder="Confirm password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}/>
                            </div>
                            <div className="btn">
                                <button>Continue</button>
                            </div>
                            <p className="have">
                                Have an Account?
                                <Link to={`/login/`}>
                                    <a> Login</a>
                                </Link>
                            </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterScreen;