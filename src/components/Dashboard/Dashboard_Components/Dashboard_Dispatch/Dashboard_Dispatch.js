import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { StepWizard, Step } from 'react-step-wizard';
import Step1 from './Step1';
import Step2 from './Step2';
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
                        <Route component={Step1} />
                        <Route path={`${this.props.match.url}/drivers`} component={Step2} />
                        <Route path={`${this.props.match.url}/confirmation`} component={Step2} />
                    </Switch>
                </div>
            </div>
        )
    }
}
export default Dashboard_Dispatch;

