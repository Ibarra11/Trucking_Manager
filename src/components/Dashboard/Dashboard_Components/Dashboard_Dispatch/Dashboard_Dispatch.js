import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {dashboardDispatchRoutes} from '../../../../routes';


class Dashboard_Dispatch extends Component {
    render() {
        console.log(this)
        return (
            <div className="component-dispatch">
                <div className="dashboard-header">
                    <h3>Dispatch Center</h3>
                    <Link to={`${this.props.match.url}/create`}><button className="btn btn-primary">Create Dispatch</button></Link>
                </div>
                <div className="dispatch-table">
                <h6>Previous dispatch</h6>
                    <table className="table table-bordered">
                        <tr>
                            <th>Load_Id</th>
                            <th>Company Name</th>
                            <th>Address</th>
                            <th>Rate</th>
                            <th>Date</th>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}

export default Dashboard_Dispatch;