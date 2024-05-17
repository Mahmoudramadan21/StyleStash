import React from "react"
import box1 from "../images/box1.webp"
import box2 from "../images/box2.webp"
import box3 from "../images/box3.webp"
import box4 from "../images/box4.webp"
import { Link } from "react-router-dom"

function Collections() {
    return (
        <div className="collections" id="collections">
            <div className="container">
                <div className="heading">
                    <h1 className="section-heading">Our Winter collection</h1>
                    <p id="paragraph">Discover the Cozy Chic: Our Winter Collection 2023. Stay warm while looking fabulous this season!</p>
                </div>
                <div className="boxes">
                    <div className="box box1">
                        <div className="image">
                            <img src={box1} alt="" />
                        </div>
                        <div className="content">
                            <h3>Men</h3>
                            <p>Revamp your look with our contemporary men's fashion, where comfort meets style. Elevate your confidence, one outfit at a time.</p>
                            <Link to={`/men`}>
                                <button id="explore">Explore</button>
                            </Link>
                        </div>
                    </div>
                    <div className="box box2">
                        <div className="image">
                            <img src={box2} alt="" />
                        </div>
                        <div className="content">
                            <h3>Women</h3>
                            <p>Revamp your look with our contemporary women's fashion, where comfort meets style. Elevate your confidence, one outfit at a time.</p>
                            <Link to={`/women`}>
                                <button id="explore">Explore</button>
                            </Link>                        </div>
                    </div>
                    <div className="box box3">
                        <div className="image">
                            <img src={box3} alt="" />
                        </div>
                        <div className="content">
                            <h3>Children</h3>
                            <p>Our enchanting dresses offer comfort and charm, perfect for your child's special occasions</p>
                            <Link to={`/children`}>
                                <button id="explore">Explore</button>
                            </Link>                        </div>
                    </div>
                    <div className="box box4">
                        <div className="image">
                            <img src={box4} alt="" />
                        </div>
                        <div className="content">
                            <h3>Couples</h3>
                            <p>Elevate your style with our stunning new collection. From timeless classics to bold trends, we have something for everyone.</p>
                            <Link to={`/couples`}>
                                <button id="explore">Explore</button>
                            </Link>                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Collections