import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Dashboard_Income_Metrics from './Dashboard_Income_Metrics';
import Dashboard_Income_List from './Dashboard_Income_List';
import Dashboard_Income_Add from './Dashboard_Income_Add';
class Dashboard_Income extends Component {
    render() {
        return (
            <div className="component-income">
                <div className="card">
                    <div className="card-header">
                        <h3>Income</h3>
                        <div className="link-group">
                            <Link to='/dashboard/income'><button className="btn btn-outline-primary">Income List</button></Link>
                            <Link to='/dashboard/income/metrics'><button className="btn btn-outline-primary">Income Metrics</button></Link>
                        </div>
                    </div>
                </div>
                <div className="component-income-views">
                    <Switch>
                        <Route path='/dashboard/income/metrics' component={Dashboard_Income_Metrics} />
                        <Route path='/dashboard/income/add' component={Dashboard_Income_Add} />
                        <Route  component={Dashboard_Income_List} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default Dashboard_Income;