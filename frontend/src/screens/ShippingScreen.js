import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";

function ShippingScreen () {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandlerForShippingAddress = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        const goToPaymentMethodPage = () => navigate('/payment')
        goToPaymentMethodPage()
    }

    return (
        <div className="shipping">
            <div className="container">
                <h1 className="heading">Shipping</h1>
                <form onSubmit={submitHandlerForShippingAddress}>
                    <div className="field">
                        <label htmlFor="address">Address</label>
                        <input  type="text"
                                id="address"
                                placeholder="Enter address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="city">City</label>
                        <input  type="text"
                                id="city"
                                placeholder="Enter City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="postal-code">Postal Code</label>
                        <input  type="text"
                                id="postal-code"
                                placeholder="Enter postal code"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor=""></label>
                        <input  type="text"
                                id="country"
                                placeholder="Enter Country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>
                    <div className="btn">
                        <button>Continue</button>
                    </div>
                </form>
            </div>
        </div>
    );
}



export default ShippingScreen;