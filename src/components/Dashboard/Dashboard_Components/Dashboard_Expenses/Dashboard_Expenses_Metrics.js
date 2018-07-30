import React, { Component } from 'react';
import Dashboard_Expenses_Category from './Dashboard_Expenses_Category';
import Dashboard_Expenses_Truck from './Dashboard_Expenses_Truck';
import Dashboard_Expenses_Total from './Dashboard_Expenses_Total';
import axios from 'axios';
class Dashboard_Expenses_Metrics extends Component {
    constructor() {
        super();
        this.state = {
            totalExpenses: 0
        }

    }

    componentDidMount() {
        axios.get('/api/expenses/total')
            .then(res => this.setState({ totalExpenses: res.data[0].sum }))
            .catch(err => console.log(err))
    }

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
                                    <div className="card col-md-4">
                                        <h6>Expenses Total</h6>
                                        <p>$ {this.state.totalExpenses}</p>
                                    </div>
                                    <div className="card col-md-4">
                                        <h6>Avg Expense/Month</h6>
                                        <p>$10,000</p>
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