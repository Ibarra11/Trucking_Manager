import React, { Component } from 'react';
import Dashboard_Revenue_Metrics from './Dashboard_Revenue_Metrics';
class Dashboard_Home extends Component {
    render() {
        return (
            <div className="component-dashboard-home">
                <div className="dashboard-header">
                    <h3>Revenue</h3>
                </div>
                <div className="dashboard-home-view">
                    <div className="revenue">
                        <Dashboard_Revenue_Metrics />
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard_Home;