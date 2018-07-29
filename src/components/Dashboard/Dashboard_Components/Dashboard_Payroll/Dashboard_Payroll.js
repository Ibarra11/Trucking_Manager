import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard_Payroll_Add from './Dashboard_Payroll_Add';
import Dashboard_Payroll_Metrics from './Dashboard_Payroll_Metrics';
class Dashboard_Payroll extends Component {
    render() {
        return (
            <div className="component-payroll">
                <div className="card">
                    <div className="card-header">
                        <h3>Payroll</h3>
                    </div>
                </div>
                <div className="component-payroll-views">
                    <Switch>
                            <Route path='/dashboard/payroll/add' component={Dashboard_Payroll_Add} />
                            <Route component={Dashboard_Payroll_Metrics} />
                    </Switch>
                </div>
            </div>
        )
    }
}
export default Dashboard_Payroll;