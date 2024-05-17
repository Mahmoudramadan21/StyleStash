import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { coulesListProducts, listProductDetails, listProducts, menListProducts, womenListProducts } from "../actions/productActions";
import Header from "../components/Header.js";
import Landing from "../components/Landing.js";
import Collections from "../components/Collections.js";
import Deal from "../components/Deal.js";
import Reviews from "../components/Reviews.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { addToCart } from "../actions/cartActions.js";
import box2 from "../images/box2.webp"

function WomenScreen() {

    const dispatch = useDispatch();
    const womenProductList = useSelector(state => state.womenProductList);
    const { error, loading, products } = womenProductList;

    useEffect(() => {
        dispatch(womenListProducts(""))
    }, [dispatch]);

    const [qty, setQty] = useState(1);
    const navigate = useNavigate()

    const addToCartHandler = (id, qty) => {
        dispatch(addToCart(id, qty));
        const goToCartPage = () => navigate('../cart/');
        goToCartPage();
    };

    return (
            <div>
                <div className="products">
                    <div className="container">
                        <h1 className="section-heading category-heading">Women Products</h1>
                        <div className="boxes">
                            {loading ? (<span>Loading</span>)
                                : error ? <span>Error</span>
                                    : products.map(product => (
                                        <div className="box" key={product.id}>
                                            <div className="image">
                                                <img src={box2} alt="image" />
                                            </div>
                                            <Link to={`/product/${product.id}`}>
                                                <div className="title"><h4>{product.name}</h4></div>
                                            </Link>
                                            <div className="price"><span>${product.price}</span></div>
                                            <div className="description">
                                                <p>{product.description}</p>
                                            </div>
                                            <a className="cart" onClick={() => addToCartHandler(product.id, qty)}>
                                                <span>Add to cart</span>
                                                <FontAwesomeIcon className="cartIcon" icon={faCartShopping} />
                                            </a>
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default WomenScreen;
