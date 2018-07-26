import React, { Component } from 'react';


class Dashboard_Payroll_Cards extends Component {
    render() {
        return (
            <div className="payroll-cards">
                <div className="container">
                    <div className="row">
                    <h6>Payroll Overview</h6>
                        <div className="col-md-12">
                            <div className="card">
                                <h4>Total Payed</h4>
                                <h5>$5,000</h5>

                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="card">
                                <h4>Payments Made</h4>
                                <h5>20</h5>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="card">
                                <h4>Average/Month</h4>
                                <h5>$1,000</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard_Payroll_Cards;