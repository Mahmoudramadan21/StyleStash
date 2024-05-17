import React from "react";
import Profile from "../images/profile.webp"

function Reviews() {
    return (
        <div className="reviews">
            <div className="container">
                <div className="head">
                    <h1 className="section-heading">Hear What Our Satisfied Clients Have To Say</h1>
                </div>
                <div className="boxes">
                    {[...Array(6)].map((_, index) => (
                        <div className="box" key={index}>
                            <div className="star-rating">
                                {[...Array(5)].map((_, starIndex) => (
                                    <span className="star" key={starIndex}>&#9733;</span>
                                ))}
                            </div>
                            <p>"Exceptional design expertise! The team's creativity and precision turned my fashion vision into a stunning reality. Their commitment to excellence shines through in every detail, making them my top choice for fashion design"</p>
                            <div className="profile">
                                <div className="image"><img src={Profile} alt="" /></div>
                                <div className="info">
                                    <h4>John Carter</h4>
                                    <h6>CEO at Consulting</h6>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Reviews;
