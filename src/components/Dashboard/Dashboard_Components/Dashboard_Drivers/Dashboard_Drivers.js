import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addDriver } from '../../../../ducks/drivers_reducer';
import Modal from 'react-responsive-modal';
import { eventNames } from 'cluster';
class Dashboard_Drivers extends Component {
    constructor() {
        super();
        this.state = {
            addDriver: false,
            name: '',
            contactNumber: '',
            address: '',
            dateHired: '',
            unitNumber: '',
            driverId: '',
            drivers: [],
            open: false,
            term: '',
            filterDrivers: '',
        }
    }

    onOpenModal = driverId => {
        let driver = this.state.drivers.filter(driver => driverId === driver.id);
        let { name, address, contactnumber, datehired, unitnumber } = driver[0];
        this.setState({
            open: true,
            driverId,
            name,
            contactNumber: contactnumber,
            address,
            dateHired: datehired,
            unitNumber: unitnumber
        })
    }

    onCloseModal = () => {
        this.setState({ open: false })
    }

    componentDidMount() {
        this.getDrivers();
    }

    getDrivers = () => {
        axios.get('api/drivers')
            .then(res => {
                console.log(res);
                this.setState({ drivers: res.data })
            })
            .catch(err => console.log(err))
    }

    toggleAddDriver = () => {
        this.setState({ addDriver: !this.state.addDriver })
    }

    deleteDriver = driver_id => {
        axios.delete(`/api/driver/${driver_id}`)
            .then(() => this.getDrivers())
            .catch(err => console.log(err))
    }

    addDriver = event => {
        event.preventDefault();
        let { name, contactNumber, address, dateHired, unitNumber } = this.state;
        axios.post('/api/driver', {
            name, contactNumber, address, dateHired, unitNumber
        }).then(driver => {
            this.props.history.push('/dashbaord');
        })
    }

    updateDriver = event => {
        event.preventDefault();
        axios.put(`/api/driver/${this.state.driverId}`, this.state)
            .then(() => {
                this.onCloseModal();
                this.getDrivers();
            })
            .catch(err => console.log(err));
    }

    filterDrivers = event => {
        let drivers = this.state.filter(driver => driver.name === event.target.name);

        
    }


    onInputChange = event => this.setState({ [event.target.name]: event.target.value })

    render() {
        if (!this.state.addDriver) {
            return (
                <div className='component-dashboard-drivers'>
                    {/* Edit Modal */}
                    <div className="edit-driver">
                        <Modal classNames={{ modal: 'custom-modal' }} open={this.state.open} onClose={this.onCloseModal} center>
                            <h2>Edit Driver</h2>
                            <form onSubmit={this.updateDriver} className="edit-driver-form">
                                <div className="form-group">
                                    <h6 className="driver">Name</h6>
                                    <input name='name' onChange={this.onInputChange} value={this.state.name} className="form-control" type="text" />
                                </div>
                                <div className="form-group">
                                    <h6>Contact Number </h6>
                                    <input onChange={this.onInputChange} name='contactNumber' value={this.state.contactNumber} className="form-control" type="text" />
                                </div>
                                <div className="form-group">
                                    <h6>Address</h6>
                                    <input onChange={this.onInputChange} name='address' value={this.state.address} className="form-control" type="text" />
                                </div>
                                <div className="form-group">
                                    <h6>Date Hired</h6>
                                    <input onChange={this.onInputChange} name='dateHired' value={this.state.dateHired} className="form-control" type="text" />
                                </div>
                                <div className="form-group">
                                    <h6>Assigned Truck</h6>
                                    <input onChange={this.onInputChange} name='unitNumber' value={this.state.unitNumber} className="form-control" type="text" />
                                </div>
                                <div className="edit-form-buttons">
                                    <button type='submit' className="btn btn-primary">Update</button>
                                </div>
                            </form>
                        </Modal>
                    </div>
                    <div className="dashboard-header">
                        <div className="dashboard-header-left">
                            <h4>Driver List</h4>
                            <div className="input-group-append">
                                <input onChange={this.filterDrivers} placeholder='search drivers' className="form-control" type="text" />
                                <button className='search-button'><i className='fa fa-search'></i></button>
                            </div>
                        </div>
                        <div className="dashboard-header-right">
                            <button onClick={this.toggleAddDriver} className="btn btn-success">Add Driver</button>
                        </div>
                    </div>
                    <div className="dashboard-drivers-view">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Driver_ID</th>
                                    <th>Name</th>
                                    <th>Contact Number</th>
                                    <th>Address</th>
                                    <th>Date Hired</th>
                                    <th>Assigned Truck</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.drivers.map(driver => {
                                    return (
                                        <tr key={driver.id}>
                                            <td>{driver.id}</td>
                                            <td>{driver.name}</td>
                                            <td>{driver.contactnumber}</td>
                                            <td>{driver.address}</td>
                                            <td>{driver.datehired}</td>
                                            <td>{driver.unitnumber}</td>
                                            <td className="actions">
                                                <button onClick={() => this.onOpenModal(driver.id)} className="btn btn-primary"><i className="fa fa-edit"></i></button>
                                                <button onClick={() => this.deleteDriver(driver.id)} className="btn btn-danger"><i className="fa fa-close"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
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
                            <input onChange={this.onInputChange} name='dateHired' className="form-control" type="text" />
                        </div>
                        <div className="form-group">
                            <h6>Unit# Employee Drives</h6>
                            <input onChange={this.onInputChange} name='unitNumber' className="form-control" type="text" />
                        </div>
                        <div className="form-drivers-add-buttons">
                            <button type='submit' className="btn btn-success">Add</button>
                            <button className="btn btn-danger" onClick={this.toggleAddDriver}>Cancel</button>
                        </div>
                    </form>
                </div>
            )
        }
    }
}



export default Dashboard_Drivers;