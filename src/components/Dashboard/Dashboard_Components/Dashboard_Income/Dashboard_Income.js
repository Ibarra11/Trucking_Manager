import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Dashboard_Income_Metrics from './Dashboard_Income_Metrics';
import Dashboard_Income_List from './Dashboard_Income_List';
import Dashboard_Income_Add from './Dashboard_Income_Add';
class Dashboard_Income extends Component {
    render() {
        return (
            <div className="component-income">
                <div className="dashboard-header">
                    <h3>Income</h3>
                    <div className="link-controls">
                            <Link to='/dashboard/income'><button className="btn">Income Records</button></Link>
                            <Link to='/dashboard/income/metrics'><button className="btn">Income Metrics</button></Link>
                        </div>
                </div>
                <div className="component-income-views">
                    <Switch>
                        <Route path='/dashboard/income/metrics' component={Dashboard_Income_Metrics} />
                        <Route path='/dashboard/income/add' component={Dashboard_Income_Add} />
                        <Route component={Dashboard_Income_List} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default Dashboard_Income;