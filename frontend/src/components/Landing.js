import React from "react"
import profile from "../images/profile.webp"
function Landing() {
    return(
        <div className="landing">
            <div className="container">
                <div className="content">
                    <h1>Dive Into A World Of Endless Fashion Possibilities</h1>
                    <p id="main-p">Dive into a realm of endless fashion possibilities. Explore our diverse collections and redefine your style. Your fashion journey begins here
                    </p>
                    <div className="buttons">
                        <a href="#"><button id="explore">Explore Now</button></a>
                        <a href="#"><button id="contact">Contact us</button></a>
                    </div>
                    <p id="discount">20% DISCOUNT OVER 47$ USE CODE 7DJK #8HH7</p>
                </div>
                <div className="images">
                    <img src={profile} alt="" />
                </div>
            </div>
        </div>

    )
}

export default Landing;