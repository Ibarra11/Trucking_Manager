import React, { Component } from 'react';
import Dashboard_Income_Monthly from './Dashboard_Income_Monthly';
import Dashboard_Income_Company from './Dashboard_Income_Company';
class Dashboard_Income extends Component {
    render() {
        return (
            <div className="component-income">
                <div className="card">
                    <div className="card-header">
                        <h3>Income</h3>
                    </div>
                </div>
                <div className="income-view">
                    <div className="card">
                        <div className="card-header">
                            <h4>Metrics Overview</h4>
                        </div>
                        <div className="card-body">
                            <div className="stats">
                                <div className="total-income">
                                    <h6>Total Income</h6>
                                    <p>$20,345</p>
                                </div>
                                <div className="total-income">
                                    <h6>Avg Income/Month</h6>
                                    <p>$20,345</p>
                                </div>
                            </div>
                            <div className="graphs">
                                <div className="income-monthly">
                                <h5>Income Per Month</h5>
                                    <Dashboard_Income_Monthly />
                                </div>
                                <div className="income-monthly">
                                <h5>Income Per Company</h5>
                                    <Dashboard_Income_Company />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard_Income;