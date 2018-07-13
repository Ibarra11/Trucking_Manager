import React, { Component } from 'react';
import axios from 'axios';
class Dashboard_Drivers extends Component {
    constructor() {
        super();
        this.state = {
            addDriver: false,
            name: '',
            contactNumber: '',
            address: '',
            dateHired: '',
            unitNumber: ''
        }
    }
    toggleAddDriver = () => {
        this.setState({ addDriver: !this.state.addDriver })
    }

    addDriver = event =>{
        event.preventDefault();
        let{name, contactNumber, address, dateHired, unitNumber} = this.state;
        axios.post('/api/driver', {
            name, contactNumber,address, dateHired, unitNumber
        })
    }



    render() {
        if (!this.state.addDriver) {
            return (
                <div className='component-dashboard-drivers'>
                    <div className="dashboard-header">
                        <div className="dashboard-header-left">
                            <h4>Driver List</h4>
                            <div className="input-group-append">
                                <input placeholder='search drivers' className="form-control" type="text" />
                                <button className='search-button'><i className='fa fa-search'></i></button>
                            </div>
                        </div>
                        <div className="dashboard-header-right">
                            <button onClick={this.toggleAddDriver} className="btn btn-success">Add Driver</button>
                        </div>
                    </div>
                    <div className="dashboard-drivers-view">
                        <table className="table table-shaded">
                            <thead>
                                <tr>
                                    <th>Employee_ID</th>
                                    <th>Name</th>
                                    <th>Contact Number</th>
                                    <th>Address</th>
                                    <th>Date Hired</th>
                                    <th>Drives Truck#</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="dashboard-drivers-add">
                    <h3 className="drivers-add-h3">Add Driver</h3>
                    <form onSubmit={this.addDriver} className="form-drivers-add">
                        <div className="form-group">
                            <h6>Name</h6>
                            <input name='name' className="form-control" type="text" />
                        </div>
                        <div className="form-group">
                            <h6>Contact Number</h6>
                            <input name='contactNumber' className="form-control" type="text" />
                        </div>

                        <div className="form-group">
                            <h6>Address</h6>
                            <input name='address'className="form-control" type="text" />
                        </div>
                        <div className="form-group">
                            <h6>Date Hired</h6>
                            <input name='dateHired'className="form-control" type="text" />
                        </div>
                        <div className="form-group">
                            <h6>Unit# Employee Drives</h6>
                            <input name='unitNumber' className="form-control" type="text" />
                        </div>
                        <div className="form-drivers-add-buttons">
                            <button type='submit' className="btn btn-success">Add</button>
                            <button  className="btn btn-danger" onClick={this.toggleAddDriver}>Cancel</button>
                        </div>
                    </form>
                </div>
            )
        }
    }
}

export default Dashboard_Drivers;