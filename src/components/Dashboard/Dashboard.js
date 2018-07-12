import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Route, Link } from 'react-router-dom';
import Dashboard_Home from './Dashboard_Components/Dashboard_Home';
import Dashboard_Trucks from './Dashboard_Components/Dashboard_Trucks';
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
                        <li>
                            <h5>Home</h5>
                        </li>
                        <li >
                            <h5>Trucks</h5>
                        </li>
                        <li>
                            <h5>Fuel</h5>
                        </li>
                        <li>
                            <h5>Drivers</h5>
                        </li>
                        <li>
                            <h5>Maintenance</h5>
                        </li>
                        <li>
                            <h5>IFTA</h5>
                        </li>
                        <li>
                            <h5>1099</h5>
                        </li>
                        <li>
                            <h5>Navigation</h5>
                        </li>
                        <li>
                            <h5>Contacts</h5>
                        </li>
                    </ul>
                </nav>
                <div className='dashboard-content'>
                    <Switch>
                        <Route path='/trucks' component={Dashboard_Trucks} />
                        <Route path='/' component={Dashboard_Home} />
                    </Switch>
                </div>
            </div>

        )
    }
}

export default Dashboard;