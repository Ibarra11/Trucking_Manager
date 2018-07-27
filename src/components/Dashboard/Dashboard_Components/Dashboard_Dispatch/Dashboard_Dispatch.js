import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
class Dashboard_Dispatch extends Component {
    render() {
        return (
            <div className="component-dispatch">
                <div className="card">
                    <div className="card-header">
                        <h3>Dispatch</h3>
                    </div>
                </div>
                <div className="dispatch-wizard">
                    <Switch>
                        <Route exact path={'/dashboard/dispatch/drivers'} component={Step2} />
                        <Route path={`/dashboard/dispatch/confirmation`} component={Step3} />
                        <Route component={Step1} />
                    </Switch>
                </div>
            </div>
        )
    }
}
export default Dashboard_Dispatch;

