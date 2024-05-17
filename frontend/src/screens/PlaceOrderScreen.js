import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { Navigate, useNavigate } from 'react-router-dom'
import ErrorComponent from '../components/ErrorComponent'

function PlaceOrderScreen() {

    const orderCreate = useSelector(state => state.orderCreate)
    const {order, error, success} = orderCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number((0.082) * cart.itemsPrice).toFixed(2)

    cart.totalPrice = (Number(cart.itemsPrice)) + (Number(cart.shippingPrice)) + (Number(cart.taxPrice))

    useEffect(() => {
        if(success){
            dispatch({type: ORDER_CREATE_RESET})
            navigate(`../admin/order/${order.id}`)
        }
    }, [dispatch, success])

    if (!userInfo) {
        navigate('/login')
    }

    const placeorder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }
    return (
        <div className="placeorder">
            <div className="container">
                {error ? <ErrorComponent /> : (
                    <>
                        <div className="order">
                            <div className="shipping row">
                                <h1 className="heading">Shipping</h1>
                                <div className="shipping-info">
                                    <p>Shipping:    {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</p>
                                </div>
                            </div>
                            <div className="payment-method row">
                                <h1 className="heading">Payment method</h1>
                                <div className="payment-info">
                                    <p>Method: {cart.paymentMethod.paymentMethod}</p>
                                </div>
                            </div>
                            <div className="order-items row">
                                <h1 className="heading">Order items</h1>
                                <div className="items">
                                    {cart.cartItems.map(item => (
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
                        </div>
                        <div className="order-summary">
                            <h1 className="heading">Order Summary</h1>
                            <div className="summary">
                                <div className="items row">
                                    <p>
                                        <span>Items:</span>
                                        <span>${cart.itemsPrice}</span>
                                    </p>
                                </div>
                                <div className="shipping row">
                                    <p>
                                            <span>Shipping:</span>
                                            <span>${cart.shippingPrice}</span>
                                    </p>
                                </div>
                                <div className="tax row">
                                    <p>
                                            <span>Tax:</span>
                                            <span>${cart.taxPrice}</span>
                                    </p>
                                </div>
                                <div className="total row">
                                    <p>
                                            <span>Total:</span>
                                            <span>${cart.totalPrice}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="btn">
                                    <button onClick={placeorder}>Place Order</button>
                            </div>
                        </div>
                    </> )
                }
            </div>
        </div>
    );
}

export default PlaceOrderScreen
