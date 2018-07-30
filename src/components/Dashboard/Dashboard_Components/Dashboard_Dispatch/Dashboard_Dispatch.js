import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom';
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
                <div className="dispatch-wizard container">
                    <div className="row">
                        <div className="dispatch-instructions col-md-4">
                            <h4>Dispatch Instructions</h4>
                            <div className="instructions-container">
                                <div className="instruction" >
                                    <p>1. Enter information about dispatch</p>
                                </div>
                                <div className="instruction" >
                                    <p> 2. Select drivers</p>
                                </div>
                                <div className="instruction">
                                    <p>3. Send dispatch to drivers</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="wizard">
                                <Switch>
                                    <Route exact path={'/dashboard/dispatch/drivers'} component={Step2} />
                                    <Route path={`/dashboard/dispatch/confirmation`} component={Step3} />
                                    <Route component={Step1} />
                                </Switch>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}
export default Dashboard_Dispatch;

