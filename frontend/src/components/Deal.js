import React from "react"
import deal from "../images/deal.webp"
function Deal() {
    return (
        <div className="deal">
            <div className="container">
                <div className="caption">
                    <h1>Deal of the day</h1>
                    <p>Select the ideal winter coat for an extended period at the best price available, but act quickly, as this exclusive deal is only valid for today.</p>
                    <div className="date">
                        <div className="field day">
                            <span id="number">01</span>
                            <span id="str">Day</span>
                        </div>
                        <div className="field month">
                            <span id="number">11</span>
                            <span id="str">Month</span>
                        </div>
                        <div className="field year">
                            <span id="number">23</span>
                            <span id="str">Year</span>
                        </div>
                    </div>
                    <div className="button">
                        <a href="#"><button>Shop now</button></a>
                    </div>
                </div>
                <div className="image">
                    <img src={deal} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Deal