import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard_Drivers_Add from './Dashboard_Drivers_Add';
import Dashboard_Drivers_Table from './Dashboard_Drivers_Table';
class Dashboard_Drivers extends Component {
    render() {
        return (
            <div className="component-drivers">
                <div className="dashboard-header">
                    <h3>Drivers</h3>
                </div>
                <div className="drivers-view">
                    <Switch>
                        <Route path='/dashboard/drivers/add' component={Dashboard_Drivers_Add} /> 
                        <Route component={Dashboard_Drivers_Table}  /> 
                    </Switch>
                </div>
            </div>
        )
    }
}



export default Dashboard_Drivers;