import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions"; // Assuming you have an action for saving payment method
import { Link, useNavigate } from "react-router-dom";

function PaymentScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const submitHandlerForPayment = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod({paymentMethod}));
        const goToPlaceOrderPage = () => navigate('/placeorder')
        goToPlaceOrderPage()
    };

    if (!userInfo) {
        navigate('/login')
    }

    return (
        <div className="payment">
            <div className="container">
                <h1 className="heading">Payment method</h1>

                <form onSubmit={submitHandlerForPayment}>
                    <div className="field">
                        <input
                            type="radio"
                            id="paypal"
                            value="PayPal"
                            checked={paymentMethod === "PayPal"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="paypal">PayPal</label>
                    </div>
                    <div className="field">
                        <input
                            type="radio"
                            id="cash"
                            value="Cash"
                            checked={paymentMethod === "Cash"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="cash">Cash</label>
                    </div>
                    <div className="btn">
                        <button>Continue</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PaymentScreen;
