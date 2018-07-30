import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard_Trucks_Add from './Dashboard_Trucks_Add';
import Dashboard_Trucks_Table from './Dashboard_Trucks_Table';
class Dashboard_Trucks extends Component {
    render() {
        return (
            <div className="component-dashboard-trucks">
                <div className="card">
                    <div className="card-header">
                        <h3>Trucks</h3>
                    </div>
                </div>
                <div className="trucks-view">
                    <Switch>
                        <Route path='/dashboard/trucks/add' component={Dashboard_Trucks_Add} />
                        <Route  component={Dashboard_Trucks_Table} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default Dashboard_Trucks;