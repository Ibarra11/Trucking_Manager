import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import Dashboard_Expenses_Metrics from './Dashboard_Expenses_Metrics';
import Dashboard_Expenses_List from './Dashboard_Expenses_List';
import Dashboard_Add_Expense from './Dashboard_Add_Expense';
class Dashboard_Expenses extends Component {
    render() {
        return (
            <div className="component-expenses">
                <div className="card">
                    <div className="card-header">
                        <h3>Expenses</h3>
                        <div className="link-controls">
                            <NavLink activeClassName='selected'  to='/dashboard/expenses'> <button className="btn btn-outline-primary">Expense List</button> </NavLink>
                            <NavLink activeClassName='selected' to='/dashboard/expenses/metrics'><button className="btn btn-outline-primary">Expense Metrics</button></NavLink>
                        </div>
                    </div>
                </div>
                <div className="component-expense-content">
                    <Switch>
                        <Route path='/dashboard/expenses/metrics' component={Dashboard_Expenses_Metrics} />
                        <Route path='/dashboard/expenses/add' component={Dashboard_Add_Expense} />
                        <Route component={Dashboard_Expenses_List} />
                    </Switch>
                </div>
            </div >
        )
    }
}

export default Dashboard_Expenses;