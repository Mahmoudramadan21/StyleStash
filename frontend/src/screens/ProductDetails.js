import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { listProductDetails } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import box1 from "../images/box1.webp"
import box2 from "../images/box2.webp"
import box3 from "../images/box3.webp"
import box4 from "../images/box4.webp"
import Loader from '../components/Loader';
import ErrorComponent from '../components/ErrorComponent';

function ProductDetails() {
    const [qty, setQty] = useState(1);
    const { id } = useParams();
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const { error, loading, product } = productDetails;

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(listProductDetails(id));
    }, [dispatch, id]);

    const addToCartHandler = () => {
        dispatch(addToCart(id, qty));
        navigate('/cart/');
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorComponent message={error} />;
    }

    if (!product.name) {
        return <ErrorComponent message={`Product Not Found`} />;
    }

    return (
        <div className="product-details">
            <div className="container">
                <div className="image">
                    <img src={
                        product.typeOfProduct === "Men" ? box1 :
                        product.typeOfProduct === "Women" ? box2 :
                        product.typeOfProduct === "Unisex" ? box3 :
                        product.typeOfProduct === "Children" ? box4 :
                        ""
                    } alt="image" />
                </div>
                <div className="caption">
                    <h4>{product.name}</h4>
                    <span className="price">${product.price}</span>
                    <p>{product.description}</p>
                    <a className="cart" onClick={addToCartHandler}>
                        <span>Add to cart</span>
                        <FontAwesomeIcon className="cartIcon" icon={faCartShopping} />
                    </a>
                    <div className="social-media">
                        <a href="#"><i className="fab fa-facebook"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
