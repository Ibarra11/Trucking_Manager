import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { dashboardRoutes } from '../../routes';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            accountType: '',
            password: '',
            name: ''
        }
    }
    render() {
        return (
            <div className='component-dashboard'>
                <nav className="dashboard-nav">
                    <h1>Trucking Manager</h1>
                    <ul className="nav-link-container">
                        <Link className="nav-link" to='/dashboard'>
                            <h5>Home</h5>
                        </Link>
                        <Link className="nav-link" to='/dashboard/trucks'>
                            <h5>Trucks</h5>
                        </Link>
                        <Link className="nav-link" to='/dashboard/expenses'>
                            <h5>Expenses</h5>
                        </Link>
                        <Link className="nav-link" to='/dashboard/income'>
                            <h5>Income</h5>
                        </Link>
                        <Link className="nav-link" to='/dashboard/drivers'>
                            <h5>Drivers</h5>
                        </Link>
                        <Link className="nav-link" to='/dashboard/payroll'>
                            <h5>Payroll</h5>
                        </Link>
                        <Link className="nav-link" to='/dashboard/ifta'>
                            <h5>IFTA</h5>
                        </Link>
                        <Link className="nav-link" to='/dashboard/navigation'>
                            <h5>Navigation</h5>
                        </Link>
                        <Link className="nav-link" to='/dashboard/contacts'>
                            <h5>Contacts</h5>
                        </Link>
                        <Link className="nav-link" to='/dashboard/dispatch'>
                            <h5>Dispatch</h5>
                        </Link>
                        <Link className="nav-link" to='/dashboard/dispatch'>
                            <h5>Account</h5>
                        </Link>
                    </ul>
                </nav>
                <div className='dashboard-content'>
                    <div className="dashboard-views">
                        {dashboardRoutes()}
                    </div>
                </div>
            </div>

        )
    }
}

export default Dashboard;