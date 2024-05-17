import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Import Link from React Router
import { getUserDetails, register, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { listMyOrders } from "../actions/orderActions";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import Loader from "../components/Loader";
import ErrorComponent from "../components/ErrorComponent";

function ProfileScreen() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    const redirect = window.location.search ? window.location.search.split("=")[1] : "/";

    const navigate = useNavigate()

    useEffect(() => {
        if (!userInfo) {
            const goToLoginPage = () => navigate('/login/');
            goToLoginPage()
        }
        else {
            if(!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }
            else {
                console.log(user)
                setFirstName(user.name.split(" ")[0])
                setlastName(user.name.split(" ")[1])
                setUsername(user.username)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo, user, success]);

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setMessage("Password don't match")
        }
        else {
            dispatch(updateUserProfile({
                'first-name': firstName,
                'last-name': lastName,
                'username': username,
                'email': email,
                'password': password,
            }))
        }
    }

    return (
        <div className="profile">
            <div className="container">
                {loading ? <Loader /> : error ? <ErrorComponent message={error} /> :
                    (
                        <div className="user-profile">
                            <h1 className="heading">User Profile</h1>
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
                        </form>
                        </div>
                    )}
                <div className="orders">
                    <h1 className="heading">My Orders</h1>
                    {loadingOrders ? <Loader /> : errorOrders ? <ErrorComponent message={error} /> :
                    (
                        <table className='content-table'>
                            <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Paid</th>
                                        <th>Delivered</th>
                                    </tr>
                            </thead>
                            <tbody>
                                    {orders && orders.map(order => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>${order.totalPrice}</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                                <i className='fas fa-times'  style={{ color: 'red' }}></i>
                                            )}</td>
                                            <td>
                                                <div className="btn">
                                                    <button onClick={() => navigate(`../admin/order/${order.id}`)}>Details</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen;