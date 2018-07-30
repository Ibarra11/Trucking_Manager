import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class Dashboard_Drivers_Add extends Component {

    constructor(){
        super();
        this.state = {
            name: '',
            contactNumber: '',
            address: '',
            dateHired: ''

        }
    }

    addDriver = event => {
        event.preventDefault();
        let { name, contactNumber, address, dateHired, unitNumber } = this.state;
        axios.post('/api/driver', {
            name, contactNumber, address, dateHired, unitNumber
        }).then(driver => {
            this.props.history.goBack();
        })
    }
    onInputChange = event => this.setState({[event.target.name]: event.target.value})
    render() {
        return (
            <div className="dashboard-drivers-add">
                <h4 className="drivers-add-h3">Add Driver</h4>
                <form onSubmit={this.addDriver} className="form-drivers-add">
                    <div className="form-group">
                        <h6>Name</h6>
                        <input onChange={this.onInputChange} name='name' className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                        <h6>Contact Number</h6>
                        <input onChange={this.onInputChange} name='contactNumber' className="form-control" type="text" />
                    </div>

                    <div className="form-group">
                        <h6>Address</h6>
                        <input onChange={this.onInputChange} name='address' className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                        <h6>Date Hired</h6>
                        <input onChange={this.onInputChange} name='dateHired' className="form-control" type="date" />
                    </div>
                    <div className="form-group">
                        <h6>Assigned Truck</h6>
                        <input onChange={this.onInputChange} name='unitNumber' className="form-control" type="text" />
                    </div>
                    <div className="form-drivers-add-buttons">
                        <button type='submit' className="btn btn-success">Add</button>
                        <Link to='/dashboard/drivers'> <button className="btn btn-danger" onClick={this.toggleAddDriver}>Cancel</button></Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default Dashboard_Drivers_Add;