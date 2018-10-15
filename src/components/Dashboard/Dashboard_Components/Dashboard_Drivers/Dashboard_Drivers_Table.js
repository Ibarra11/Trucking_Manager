import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import { Link } from 'react-router-dom';

class Dashboard_Drivers_Table extends Component {
    constructor() {
        super();
        this.state = {
            addDriver: false,
            name: '',
            contactNumber: '',
            dateHired: '',
            unitNumber: '',
            driverId: '',
            drivers: [],
            open: false,
        }
    }
    onOpenModal = driverId => {
        let driver = this.state.drivers.filter(driver => driverId === driver.id);
        let { name,  contactnumber, datehired, unitnumber } = driver[0];
        this.setState({
            open: true,
            driverId,
            name,
            contactNumber: contactnumber,
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
                this.setState({ drivers: res.data })
            })
            .catch(err => console.log(err))
    }
    deleteDriver = driver_id => {
        axios.delete(`/api/driver/${driver_id}`)
            .then(() => this.getDrivers())
            .catch(err => console.log(err))
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
    onInputChange = event => this.setState({ [event.target.name]: event.target.value })

    render() {
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
                <div className="dashboard-drivers-view">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Driver_ID</th>
                                <th>Name</th>
                                <th>Date Hired</th>
                                <th>Assigned Truck</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.drivers.map(driver => {
                                let month = driver.month_hired;
                                let day = driver.day_hired;
                                let year = driver.year_hired;
                                if(month < 10){
                                    month = '0' + month;
                                }
                                if(day < 10){
                                    day = '0' + day;
                                }

                                return (
                                    <tr key={driver.driver_id}>
                                        <td>{driver.driver_id}</td>
                                        <td>{driver.name}</td>
                                        <td>{month + '/' + day + '/' + year}</td>
                                        <td>{driver.unit_number}</td>
                                        <td className="actions">
                                            <button onClick={() => this.onOpenModal(driver.id)} className="btn btn-primary"><i className="fa fa-edit"></i></button>
                                            <button onClick={() => this.deleteDriver(driver.id)} className="btn btn-danger"><i className="fa fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className="table-controls">
                        <Link to='/dashboard/drivers/add'><button className="btn"><i className="fa fa-plus"></i> Driver</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}



export default Dashboard_Drivers_Table;