import React, { Component } from 'react';
import Dashboard_Home_Metrics from './Dashboard_Home_Metrics';
import Dashboard_Weather from './Dashboard_Weather';
class Dashboard_Home extends Component {
    render() {
        return (
            <div className="component-dashboard-home">
                <div className="card">
                    <div className="card-header">
                        <h3>Revenue</h3>
                    </div>
                </div>
                <div className="dashboard-home-view">
                    <div className="revenue">
                        <Dashboard_Home_Metrics />
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard_Home;