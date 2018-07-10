import React, { Component } from 'react';
import './Dashboard.css';
import axios from 'axios';
class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            accountType: '',
            password: ''
        }
    }

    render() {
        return (
            <div className='component-dashboard'>
                <h1>Dashboard</h1>
            </div>

        )
    }
}

export default Dashboard;