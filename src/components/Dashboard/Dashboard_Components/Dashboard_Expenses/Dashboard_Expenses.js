import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dashboard_Expenses_Category from './Dashboard_Expenses_Category';
import Dashboard_Expenses_Truck from './Dashboard_Expenses_Truck';
import Dashboard_Expenses_Total from './Dashboard_Expenses_Total';
class Dashboard_Expenses extends Component {
    render() {
        return (
            <div className="component-expenses">
                <div className="card">
                    <div className="card-header">
                        <h3>Expenses</h3>
                        <Link to='/dashboard/expenses/list'><button className="btn">View Expense List</button></Link>
                    </div>
                </div>
                <div className="component-expenses-view">
                    <div className="expense-bar">
                        <Dashboard_Expenses_Total />
                        <Dashboard_Expenses_Category />
                        <Dashboard_Expenses_Truck />
                    </div>
                </div>
            </div >
        )
    }
}

export default Dashboard_Expenses;