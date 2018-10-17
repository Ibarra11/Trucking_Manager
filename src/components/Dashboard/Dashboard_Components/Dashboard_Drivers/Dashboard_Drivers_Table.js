import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Pagination from '../../../../utilities/Pagination';
class Dashboard_Drivers_Table extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            dateHired: moment(),
            unitNumber: '',
            driverId: '',
            drivers: [],
            truckList: [],
            open: false
        }
        this.pagination = new Pagination([], 8);
        this.currentPage = 1;
    }
    onOpenModal = driver => {
        let { name, dayHired, monthHired, yearHired, unit_number, driver_id } = driver;
        if (dayHired < 10) {
            dayHired = '0' + dayHired;
        }
        if (monthHired < 10) {
            monthHired = '0' + monthHired;
        }
        let dateHired = monthHired + '/' + dayHired + '/' + yearHired;
        dateHired = moment({ dateHired });
        this.setState({
            open: true,
            driverId: driver_id,
            name,
            dateHired,
            unitNumber: unit_number
        })
    }

    onCloseModal = () => {
        this.setState({ open: false })
    }

    componentDidMount() {
        this.getDrivers();
        this.getTrucks();
    }

    getDrivers = () => {
        axios.get('api/drivers')
            .then(res => {
                if (res.data.length > 0) {
                    this.pagination.itemList = res.data;
                    this.pagination.calculateNumOfPages();
                    let pageItems = this.pagination.displayItemsOnPage(this.currentPage);
                    this.setState({ drivers: pageItems })
                }

            })
            .catch(err => console.log(err))
    }

    getTrucks = () => {
        axios.get('/api/trucks')
            .then(res => this.setState({ truckList: res.data }))
            .catch(err => console.log(err))
    }

    deleteDriver = driver_id => {
        axios.delete(`/api/driver/${driver_id}`)
            .then(() => this.getDrivers())
            .catch(err => console.log(err))
    }

    updateDriver = event => {
        event.preventDefault();
        let { name, dateHired, unitNumber } = this.state;
        let formatDate = moment(dateHired).format('MM DD YYYY').split(' ');
        let monthHired = +formatDate[0];
        let dayHired = +formatDate[1];
        let yearHired = +formatDate[2];
        axios.put(`/api/driver/${this.state.driverId}`, {
            name, monthHired, dayHired, yearHired, unitNumber
        })
            .then(() => {
                this.onCloseModal();
                this.getDrivers();
            })
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

    onInputChange = event => this.setState({ [event.target.name]: event.target.value })

    onDateChange = date => this.setState({ dateHired: date })

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
                                <h6>Date Hired</h6>
                                <DatePicker
                                    className="form-control"
                                    selected={this.state.dateHired}
                                    onChange={this.onDateChange}
                                />
                            </div>
                            <div className="form-group">
                                <h6>Assigned Truck</h6>
                                <select onChange={this.onInputChange} className="form-control" name="unitNumber" >
                                    {this.state.truckList.map(truck => {
                                        return <option key={truck.truck_id} value={truck.unit_number}>{truck.unit_number}</option>
                                    })}
                                </select>
                            </div>
                            <div className="edit-form-buttons">
                                <button type='submit' className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </Modal>
                </div>
                <div className="table-container">
                    <div className="table-header">
                        <h4>Driver Schedule</h4>
                        <div className="table-add">
                            <Link to='/dashboard/drivers/add'><button className="btn"><i className="fa fa-plus"></i> Driver</button></Link>
                        </div>
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Driver ID</th>
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
                                if (month < 10) {
                                    month = '0' + month;
                                }
                                if (day < 10) {
                                    day = '0' + day;
                                }

                                return (
                                    <tr key={driver.driver_id}>
                                        <td>{driver.driver_id}</td>
                                        <td>{driver.name}</td>
                                        <td>{month + '/' + day + '/' + year}</td>
                                        <td>{driver.unit_number}</td>
                                        <td className="table-buttons">
                                            <button onClick={() => this.onOpenModal(driver)} className="btn btn-primary"><i className="fa fa-edit"></i></button>
                                            <button onClick={() => this.deleteDriver(driver.id)} className="btn btn-danger"><i className="fa fa-trash"></i></button>
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



export default Dashboard_Drivers_Table;