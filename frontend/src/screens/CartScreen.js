import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartScreen() {
    const { id } = useParams();
    const qty = window.location.search ? Number(window.location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty));
        }
    }, [dispatch, id, qty]);

    const editCartHandler = (id, qty) => {
        console.log(qty)
        dispatch(addToCart(id, qty));
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <div className="cart">
            <div className="container">
                <div className="shopping-cart">
                    <h1 className="heading">Shopping Cart</h1>
                    <div className="items">
                        {cartItems.map(item => (
                            <div className="item" key={item.id}>
                                <div className="image">
                                    <img src={item.image} alt="image" />
                                </div>
                                <div className="title">
                                    <Link to={`/product/${item.product}`}>
                                        <p>{item.name}</p>
                                    </Link>
                                </div>
                                <div className="price">${item.price}</div>
                                <div className="qty">
                                    <FontAwesomeIcon icon={faMinus} onClick={() => editCartHandler(item.product, item.qty - 1)} className="update-qty" />
                                    <span>{item.qty}</span>
                                    <FontAwesomeIcon icon={faPlus} onClick={() => editCartHandler(item.product, item.qty + 1)} className="update-qty" />
                                </div>
                                <div className="del">
                                    <FontAwesomeIcon icon={faTrash} onClick={() => removeFromCartHandler(item.product)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="subtotal">
                    <div className="heading">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</div>
                    <div className="price">${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</div>
                    <Link to="/shipping">
                        <div className="checkout">Proceed to checkout</div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CartScreen;
