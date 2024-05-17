import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheck, FaEdit } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { listOrders } from '../actions/orderActions';
import Loader from "../components/Loader.js";
import ErrorComponent from "../components/ErrorComponent.js";

function OrderListScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
        }
        else {
            const goToLoginPage = () => navigate('/login')
            goToLoginPage()
        }
    }, [dispatch, userInfo]);


    return (
        <div className="orders">
            <div className="container">
                <h1 className="heading">Orders</h1>
                {
                        loading ? <Loader /> :
                            error ? <ErrorComponent /> :
                            (
                                <div className="content">
                                    <table className='content-table'>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>USER</th>
                                                <th>DATE</th>
                                                <th>Total</th>
                                                <th>PAID</th>
                                                <th>DELIVERED</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map(order => (
                                                <tr key={order.id}>
                                                    <td>{order.id}</td>
                                                    <td>{order.user && order.user.name}</td>
                                                    <td>{order.createdAt.substring(0, 10)}</td>
                                                    <td>${order.totalPrice}</td>

                                                    <td>{order.isPaid ? (
                                                        order.paidAt.substring(0, 10)
                                                    ) : (
                                                            <i className='fas fa-check' style={{ color: 'red' }}></i>
                                                        )}
                                                    </td>

                                                    <td>{order.deliverdAt ? (
                                                        order.deliverdAt.substring(0, 10)
                                                    ) : (
                                                            <i className='fas fa-check' style={{ color: 'red' }}></i>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )
                }
            </div>
        </div>
    );
}

export default OrderListScreen;
