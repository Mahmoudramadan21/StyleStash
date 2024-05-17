import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { childrenListProducts, couplesListProducts, listProductDetails, listProducts, menListProducts, womenListProducts } from "../actions/productActions";
import Header from "../components/Header.js";
import Landing from "../components/Landing.js";
import Collections from "../components/Collections.js";
import Deal from "../components/Deal.js";
import Reviews from "../components/Reviews.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { addToCart } from "../actions/cartActions.js";
import box3 from "../images/box3.webp"
import Loader from "../components/Loader.js";
import ErrorComponent from "../components/ErrorComponent.js";

function ChildrenScreen() {

    const dispatch = useDispatch();
    const childrenProductList = useSelector(state => state.childrenProductList);
    const { error, loading, products } = childrenProductList;

    useEffect(() => {
        dispatch(childrenListProducts(""))
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
                        <h1 className="section-heading category-heading">Children Products</h1>
                        <div className="boxes">
                            {loading ? (<Loader />)
                                : error ? <ErrorComponent message={error} />
                                    : products.map(product => (
                                        <div className="box" key={product.id}>
                                            <div className="image">
                                                <img src={box3} alt="image" />
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

export default ChildrenScreen;
