import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import { Link } from 'react-router-dom';
class Dashboard_Trucks_Table extends Component {
    constructor() {
        super();
        this.state = {
            trucks: [],
            unitNumber: '',
            make: '',
            model: '',
            year: '',
            plate_number: '',
            vin: '',
            open: false
        }
    }
    onOpenModal = unitId => {
        let unitFilter = this.state.trucks.filter(truck => truck.unit === unitId);
        let { unit, make, model, year, plate_number, vin } = unitFilter[0];
        this.setState({
            unitNumber: unit, make, model, year, plate_number, vin,
            open: true
        })
    }

    onInputChange = event => { this.setState({ [event.target.name]: event.target.value }) }

    onCloseModal = () => {
        this.setState({ open: false })
    }
    componentDidMount() {
        this.getAllTrucks();
    }
    getAllTrucks = () => {
        axios.get('/api/trucks')
            .then(res => this.setState({ trucks: res.data }))
            .catch(err => console.log(err))
    }
    updateTruck = (event) => {
        event.preventDefault();
        let { unitNumber, make, model, year, plate_number, vin } = this.state
        axios.put('/api/truck', {
            unit: unitNumber, make, model, year, plate_number, vin
        })
            .then(() => {
                this.getAllTrucks();
                this.onCloseModal();
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div className="component-trucks-table">
                <div className="edit-truck">
                    <Modal classNames={{ modal: 'custom-modal' }} open={this.state.open} onClose={this.onCloseModal} center>
                        <h2>Edit Truck</h2>
                        <form onSubmit={event => this.updateTruck(event)} className="edit-driver-form">
                            <div className="form-group">
                                <h6 className="driver">Unit</h6>
                                <input name='unitNumber' onChange={this.onInputChange} value={this.state.unitNumber} className="form-control" type="text" />
                            </div>
                            <div className="form-group">
                                <h6>Make</h6>
                                <input onChange={this.onInputChange} name='make' value={this.state.make} className="form-control" type="text" />
                            </div>
                            <div className="form-group">
                                <h6>Model</h6>
                                <input onChange={this.onInputChange} name='model' value={this.state.model} className="form-control" type="text" />
                            </div>
                            <div className="form-group">
                                <h6>Year</h6>
                                <input onChange={this.onInputChange} name='year' value={this.state.year} className="form-control" type="text" />
                            </div>
                            <div className="form-group">
                                <h6>Address</h6>
                                <input onChange={this.onInputChange} name='plate_number' value={this.state.plate_number} className="form-control" type="text" />
                            </div>
                            <div className="form-group">
                                <h6>VIN</h6>
                                <input onChange={this.onInputChange} name='vin' value={this.state.vin} className="form-control" type="text" />
                            </div>
                            <div className="edit-form-buttons">
                                <button type='submit' className="btn btn-primary">Update Truck</button>
                            </div>
                        </form>
                    </Modal>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Unit</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Year</th>
                            <th>Plate #</th>
                            <th>VIN</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.trucks.map((truck, index) => {
                            return (
                                <tr key={truck.unit}>
                                    <td>{truck.unit}</td>
                                    <td>{truck.make}</td>
                                    <td>{truck.model}</td>
                                    <td>{truck.year}</td>
                                    <td>{truck.plate_number}</td>
                                    <td>{truck.vin}</td>
                                    <td>
                                        <button onClick={() => this.onOpenModal(truck.unit)} className="btn">
                                            <i className="fa fa-edit"></i>
                                        </button>
                                        <button className="btn">
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="table-controls">
                    <Link to='/dashboard/trucks/add'> <button  className="btn"><i className="fa fa-plus"> Truck</i></button></Link>
                </div>
            </div>
        )
    }
}

export default Dashboard_Trucks_Table;