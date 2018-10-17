import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import { Link } from 'react-router-dom';
import Pagination from '../../../../utilities/Pagination';
class Dashboard_Trucks_Table extends Component {
    constructor() {
        super();
        this.state = {
            trucks: [],
            truckId: '',
            unitNumber: '',
            make: '',
            model: '',
            year: '',
            plateNumber: '',
            vin: '',
            open: false
        }
        this.pagination = new Pagination([], 8);
        this.currentPage = 1;
    }
    onOpenModal = truck => {
        let { truck_id, unit_number, make, model, truck_year, plate_number, truck_vin } = truck;
        this.setState({
            truckId: truck_id, unitNumber: unit_number, make, model, year: truck_year, plateNumber: plate_number, vin: truck_vin,
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
            .then(res =>{
                if(res.data.length > 0){
                    this.pagination.itemList = res.data;
                    this.pagination.calculateNumOfPages();
                    let pageItems = this.pagination.displayItemsOnPage(this.currentPage);
                    this.setState({ trucks: pageItems })
                }
            } )
            .catch(err => console.log(err))
    }

    updateTruck = (event) => {
        event.preventDefault();
        let { truckId, unitNumber, make, model, year, plateNumber, vin } = this.state
        axios.put(`/api/truck/${truckId}`, {
            unitNumber, make, model, year, plateNumber, vin
        })
            .then(() => {
                this.getAllTrucks();
                this.onCloseModal();
            })
            .catch(err => console.log(err))
    }

    deleteTruck = truckId => {
        axios.delete(`/api/truck/${truckId}`)
            .then(() => this.getAllTrucks())
            .catch(err => console.log(err));
    }
    updatePageItems = () => {
        let incomeList = this.pagination.displayItemsOnPage(this.currentPage);
        this.setState({ incomeList })
    }

    updateCurrentPage = (dir) => {
        if (dir === 'next' && this.pagination.numberOfPages > this.currentPage) {
            this.currentPage++;
            this.updatePageItems();
        }
        else if (dir === 'prev' && this.currentPage > 1) {
            this.currentPage--;
            this.updatePageItems();
        }
    }

    renderPageNumbers = () => {
        let tempArr = [];
        for (let i = 0; i < this.pagination.numberOfPages; i++) {
            tempArr.push(
                <div className={this.currentPage === i + 1 ? 'page-number active' : 'page-number'} key={i}>
                    {i + 1}
                </div>
            )
        }
        return tempArr;
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
                                <h6>VIN</h6>
                                <input onChange={this.onInputChange} name='vin' value={this.state.vin} className="form-control" type="text" />
                            </div>
                            <div className="edit-form-buttons">
                                <button type='submit' className="btn btn-primary">Update Truck</button>
                            </div>
                        </form>
                    </Modal>
                </div>
                <div className="table-container">
                    <div className="table-header">
                        <h4>Truck Schedule</h4>
                        <div className="table-add">
                            <Link to='/dashboard/trucks/add'> <button className="btn"><i className="fa fa-plus"> Truck</i></button></Link>
                        </div>
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
                                    <tr key={truck.truck_id}>
                                        <td>{truck.unit_number}</td>
                                        <td>{truck.make}</td>
                                        <td>{truck.model}</td>
                                        <td>{truck.truck_year}</td>
                                        <td>{truck.plate_number}</td>
                                        <td>{truck.truck_vin}</td>
                                        <td className="table-buttons">
                                            <button onClick={() => this.onOpenModal(truck)} className="btn btn-primary">
                                                <i className="fa fa-edit"></i>
                                            </button>
                                            <button onClick={() => this.deleteTruck(truck.truck_id)} className="btn btn-danger">
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className="table-controls">
                        <div className="pagination">
                            <div onClick={() => this.updateCurrentPage('prev')} className="pagination-button"> <i className="fa fa-angle-left"></i> </div>
                            <div className="pages">
                                {this.renderPageNumbers()}
                            </div>
                            <div onClick={() => this.updateCurrentPage('next')} className="pagination-button"> <i className="fa fa-angle-right"></i> </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard_Trucks_Table;