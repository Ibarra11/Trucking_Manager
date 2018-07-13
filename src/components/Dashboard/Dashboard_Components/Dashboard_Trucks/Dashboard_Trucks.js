import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { dashboardTruckRoutes } from '../../../../routes';
class Dashboard_Trucks extends Component {
    render() {
        return (
            <div className="component-dashboard-trucks">
                <div className="trucks-header">
                    <h3>Trucks</h3>
                    <div className="trucks-search-add">
                        <input placeholder="search for a truck" className="search form-control" type="text" />
                        <Link to={'/dashboard/trucks/add'}><button className="btn btn-success">Add Truck</button></Link>
                    </div>
                </div>
                <div className="trucks-view">
                    <div className="trucks-list">
                    <h3>Truck List</h3>
                        <ul>
                        </ul>
                    </div>
                    <div className="trucks-info">
                        {dashboardTruckRoutes()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard_Trucks;