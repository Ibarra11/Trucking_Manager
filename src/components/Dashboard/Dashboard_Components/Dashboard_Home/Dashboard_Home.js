import React, { Component } from 'react';
import Dashboard_Home_Metrics from './Dashboard_Home_Metrics';
import Dashboard_Weather from './Dashboard_Weather';
class Dashboard_Home extends Component {
    render() {
        return (
            <div className="component-dashboard-home">
                <div className="card">
                    <div className="card-header">
                        <h3>Home</h3>
                    </div>
                </div>
                <div className="dashboard-home-view">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="revenue">
                                    <Dashboard_Home_Metrics />
                                </div>
                                <div className="weather-api">
                                    <Dashboard_Weather />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="reminders">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5>Reminders</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="reminders">
                                                <div className="card">
                                                    <h6>Renew Registrations</h6>
                                                    <p>8/15/18</p>
                                                </div>
                                                <div className="card">
                                                    <h6>Oil Change Truck #7</h6>
                                                    <p>9/10/18</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard_Home;