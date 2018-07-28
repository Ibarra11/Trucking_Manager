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
                        <div className="section-header">
                            <h4>Expense Metrics</h4>
                        </div>
                        <div className="section-content">
                            <div className="graph card">
                                <div className="card-header">
                                    <h5>Expenses Per Month</h5>
                                </div>
                                <div className="card-body">
                                    <Dashboard_Expenses_Total />
                                </div>
                            </div>
                            <div className="graph card">
                                <div className="card-header">
                                    <h5>Expenses Per Cagtegory</h5>
                                </div>
                                <div className="card-body">
                                    <Dashboard_Expenses_Category />
                                </div>
                            </div>
                            <div className="graph card">
                                <div className="card-header">
                                    <h5>Expenses Per Truck</h5>
                                </div>
                                <div className="card-body">
                                    <Dashboard_Expenses_Truck />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Dashboard_Expenses_Metrics;