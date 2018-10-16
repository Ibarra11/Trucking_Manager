import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import DatePicker from 'react-datepicker';
import moment from 'moment';
class Dashboard_Payroll_Table extends Component {
    constructor() {
        super();
        this.state = {
            payrollList: [],
            driverList: [],
            open: false,
            driver: '',
            payrollAmount: 0,
            payrollDate: moment(),
            payrollId: 0
        }
    }
    componentDidMount() {
        this.getAllPayroll();
        this.getAllDrivers();
    }

    onOpenModal = payment => {
        let { month, day, year, driver_name, payroll_amount, payroll_id } = payment;
        let payrollDate = moment(month + '/' + day + '/' + year);
        this.setState({
            open: true,
            payrollDate,
            driver: driver_name,
            payrollAmount: payroll_amount,
            payrollId: payroll_id
        })
    }

    onCloseModal = () => {
        this.setState({ open: false })
    }

    getAllPayroll = () => {
        axios.get('/api/payroll')
            .then(res => {
                this.setState({ payrollList: res.data, open: false })
            })
            .catch(err => console.log(err))
    }

    getAllDrivers = () => {
        axios.get('/api/drivers')
            .then(res => this.setState({ driverList: res.data }))
            .catch(err => console.log(err))
    }

    onInputChange = event => this.setState({ [event.target.name]: event.target.value })

    updatePayroll = event => {
        event.preventDefault();
        let { payrollDate, driver, payrollAmount  } = this.state;
        let formatedDate = moment(payrollDate).format('MM DD YYYY').split(' ');
        let month = formatedDate[0]
        let day = formatedDate[1]
        let year = formatedDate[2]
        axios.put(`/api/payroll/${this.state.payrollId}`, { month, day, year, payrollAmount, driver })
            .then(() => {
                this.getAllPayroll();
            })
    }

    deletePayroll = payrollId => {
        axios.delete(`/api/payroll/${payrollId}`)
            .then(() => this.getAllPayroll())
            .catch(err => console.log(err));
    }

    onDateChange = newDate => this.setState({payrollDate: newDate})
    render() {
        return (
            <div className="component-payroll-table container">
                <Modal classNames={{ modal: 'custom-modal' }} open={this.state.open} onClose={this.onCloseModal} center>
                    <h2>Edit Payment</h2>
                    <form onSubmit={event => this.updatePayroll(event)} className="edit-driver-form">
                        <div className="form-group">
                            <h6 className="driver">Date</h6>
                            <DatePicker
                                className="form-control"
                                selected={this.state.payrollDate}
                                onChange={this.onDateChange}
                            />
                        </div>
                        <div className="form-group">
                            <h6>Driver </h6>
                            <select onChange={this.onInputChange} className="form-control" name="driver" >
                                <option key={this.state.driver} value={this.state.driver}>{this.state.driver}</option>
                                {this.state.driverList.map(driver => {
                                    if (driver.name !== this.state.driver) {
                                        return <option key={driver.name} value={driver.name}>{driver.name}</option>
                                    }
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <h6>Amount</h6>
                            <input onChange={this.onInputChange} name='payrollAmount' value={this.state.payrollAmount} className="form-control" type="text" />
                        </div>
                        <div className="edit-form-buttons">
                            <button type='submit' className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </Modal>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-bordered table-sm">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Driver</th>
                                    <th>Amount</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.payrollList.map(payment => {
                                    let { day, month, year } = payment;
                                    if (month < 10) {
                                        month = '0' + month;
                                    }
                                    return (
                                        <tr key={payment.payroll_id}>
                                            <td><span>{month + '/' + day + '/' + year}</span></td>
                                            <td><span>{payment.driver_name}</span></td>
                                            <td><span>{payment.payroll_amount}</span></td>
                                            <td>
                                                <button onClick={() => this.onOpenModal(payment)} className="btn"><i className="fa fa-edit"></i></button>
                                                <button onClick={() => this.deletePayroll(payment.payroll_id)} className="btn"><i className="fa fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div className="table-controls">
                            <Link to='/dashboard/payroll/add'><button className="btn"><i className="fa fa-plus"> Payment</i></button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard_Payroll_Table;