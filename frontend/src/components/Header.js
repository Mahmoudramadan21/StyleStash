import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FaSearch, faMenu } from "react-icons/fa";

import { logout } from "../actions/userActions";
import { childrenListProducts, couplesListProducts, listProducts, menListProducts, womenListProducts } from "../actions/productActions";
import { couplesProductListReducer } from "../reducers/productReducers";

function Header() {
    const [search, setSearch] = useState("")

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logout());
    };

    const Dropdown = ({ isAdmin }) => { // Accepts isAdmin prop
        const [isOpen, setIsOpen] = useState(false);
        const [selectedOption, setSelectedOption] = useState(isAdmin ? "Admin" : userInfo.name); // Updated selected option

        const handleSelectClick = () => {
            setIsOpen(!isOpen);
        };

        const handleOptionClick = (option) => {
            setSelectedOption(option);
            setIsOpen(false);
        };

        return (
            <div className="dropdown">
                <div className={`select ${isOpen ? "select-clicked" : ""}`} onClick={handleSelectClick}>
                    <span className="selected">{selectedOption}</span>
                    <div className={`caret ${isOpen ? "caret-rotate" : ""}`}></div>
                </div>
                <ul className={`menu ${isOpen ? "menu-open" : ""}`}>
                    {isAdmin ? ( // If isAdmin is true, render admin menu items
                        <>
                            <li onClick={() => navigate(`admin/orders/`)}>Orders</li>
                            <li onClick={() => navigate(`admin/users/`)}>Users</li>
                            <li onClick={() => navigate(`admin/products/`)}>Products</li>
                            <li onClick={() => navigate(`/profile/`)}>Profile</li>
                        </>
                    ) : (
                        <Link to={`/profile/`}>
                            <li>Profile</li>
                        </Link>
                    )}
                    <li onClick={logoutHandler}>Logout</li> {/* Call logoutHandler when Logout is clicked */}
                </ul>
            </div>
        );
    };

    const searchHandler = (e) => {
        e.preventDefault();
        if(window.location.pathname === "/men") {
            dispatch(menListProducts(search))
            navigate(`?q=${search}`)
        }
        else if(window.location.pathname === "/women") {
            dispatch(womenListProducts(search))
            navigate(`?q=${search}`)
        }
        else if(window.location.pathname === "/couples") {
            dispatch(couplesListProducts(search))
            navigate(`?q=${search}`)
        }
        else if(window.location.pathname === "/children") {
            dispatch(childrenListProducts(search))
            navigate(`?q=${search}`)
        }
        else {
            navigate(`../products?q=${search}`);
            dispatch(listProducts(search));
        }
    }

    return (
        <div className="header">
            <div className="container">
                <Link to={`/`}>
                    <div className="logo">
                        <h2>StyleStash</h2>
                        <h4>fashion</h4>
                    </div>
                </Link>

                <div className="search">
                    <form onSubmit={searchHandler}>
                        <input  type="text"
                                placeholder="Searech"
                                onChange={e => setSearch((e.target.value).trim())}
                                />
                        <button onClick={searchHandler}>
                        <FaSearch style={{width: "16px", height: "16px"}} fill="#fff"/>
                        </button>
                    </form>
                </div>

                <div className="shop">
                    <div className="user">
                    {userInfo && userInfo.isAdmin ? <Dropdown isAdmin={true} /> : userInfo ? <Dropdown isAdmin={false} /> :
                                        <Link to={`/login/`}>
                                            <FontAwesomeIcon style={{width: "14px"}} className="cartIcon" icon={faUser} /> <h4>Login</h4>
                                        </Link>}
                    </div>

                    <div className="cart">
                        <Link to={`/cart/`}>
                            <FontAwesomeIcon className="cartIcon" icon={faCartShopping} />
                            { cartItems.length > 0 ? <span>{cartItems.length}</span>: <></> }
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
