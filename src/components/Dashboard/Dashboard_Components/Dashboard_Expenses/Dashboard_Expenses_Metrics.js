import React, { Component } from 'react';
import Dashboard_Expenses_Category from './Dashboard_Expenses_Category';
import Dashboard_Expenses_Truck from './Dashboard_Expenses_Truck';
import Dashboard_Expenses_Total from './Dashboard_Expenses_Total';
class Dashboard_Expenses_Metrics extends Component {
    render() {
        return (
            <div className="component-expenses">
                <div className="component-expenses-view">
                    <div className="expenses-overview">
                        <div className="expenses-metrics-header">
                            <h4>Expense Metrics</h4>
                        </div>
                        <div className="container">
                            <div className="expenses-metrics-layout row">
                                <div className="expenses-metrics-overall col-md-12">
                                    <div className="card col-md-3">
                                        <h6>Total</h6>
                                        $10,000
                                    </div>
                                    <div className="card col-md-3">
                                        <h6>Total</h6>
                                        $10,000
                                    </div>
                                    <div className="card col-md-3">
                                        <h6>Total</h6>
                                        $10,000
                                    </div>
                                </div>
                                <div className="expense-metrics-graphs col-md-12">
                                    <div className="graph">
                                        <h5>Expenses Per Month</h5>
                                        <Dashboard_Expenses_Total />
                                    </div>

                                    <div className="graph">
                                        <h5>Expenses Per Cagtegory</h5>
                                        <Dashboard_Expenses_Category />

                                    </div>
                                    <div className="graph">
                                        <h5>Expenses Per Truck</h5>
                                        <Dashboard_Expenses_Truck />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard_Expenses_Metrics;