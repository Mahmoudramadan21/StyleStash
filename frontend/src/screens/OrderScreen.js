import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../actions/orderActions';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from "../components/Loader.js";
import ErrorComponent from "../components/ErrorComponent.js";

function OrderScreen() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, error, loading } = orderDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            dispatch(getOrderDetails(id));
        }
    }, [dispatch, id, navigate, userInfo]);

    let itemsPrice = 0;
    let shippingPrice = 0;
    let taxPrice = 0;
    let totalPrice = 0;

    if (order && order.orderItems) {
        itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
        shippingPrice = order.shippingPrice;
        taxPrice = order.taxPrice;
        totalPrice = (+itemsPrice + +shippingPrice + +taxPrice).toFixed(2);
    }

    return (
        <div className="placeorder">
            <div className="container">
                <div className="order">
                    {(
                        <>
                            <div className="shipping row">
                                <h1 className="heading">Shipping</h1>
                                {loading ? (
                                    <Loader />
                                ) : error ? (
                                    <ErrorComponent />
                                ) : (
                                    <div className="info">
                                        <div className="name">
                                            <p>Name: {userInfo.name}</p>
                                        </div>
                                        <div className="email">
                                            <p>Email: {userInfo.email}</p>
                                        </div>
                                        <div className="shipping-info">
                                            <p>
                                                Shipping: {order.shippingAddress.address},{' '}
                                                {order.shippingAddress.city}{' '}
                                                {order.shippingAddress.postalCode},{' '}
                                                {order.shippingAddress.country}
                                            </p>
                                        </div>
                                        <div className="is-delivered">
                                            {order.isDelivered ? <p>Delivered</p> : <p>Not Delivered</p>}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="payment-method row">
                                <h1 className="heading">Payment method</h1>
                                {order && (
                                    <div className="payment-info">
                                        <p>Method: {order.paymentMethod}</p>
                                    </div>
                                )}
                                <div className="is-paid">
                                    {order && (order.isPaid ? <p>Paid</p> : <p>Not Paid</p>)}
                                </div>
                            </div>
                            <div className="order-items row">
                                <h1 className="heading">Order items</h1>
                                <div className="items">
                                    {order.orderItems.map(item => (
                                        <div className="item" key={item.id}>
                                            <div className="image">
                                                <img src={item.image} alt="image" />
                                            </div>
                                            <div className="title">
                                                <p>{item.name}</p>
                                            </div>
                                            <div className="price">{item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                    <div className="order-summary">
                        <h1 className="heading">Order Summary</h1>
                        <div className="summary">
                            <div className="items row">
                                <p>
                                    <span>Items:</span>
                                    <span>${itemsPrice}</span>
                                </p>
                            </div>
                            <div className="shipping row">
                                <p>
                                    <span>Shipping:</span>
                                    <span>${shippingPrice}</span>
                                </p>
                            </div>
                            <div className="tax row">
                                <p>
                                    <span>Tax:</span>
                                    <span>${taxPrice}</span>
                                </p>
                            </div>
                            <div className="total row">
                                <p>
                                    <span>Total:</span>
                                    <span>${totalPrice}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderScreen;
