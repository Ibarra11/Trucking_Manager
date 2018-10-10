import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-responsive-modal';
class Dashboard_Payroll_Table extends Component {
    constructor() {
        super();
        this.state = {
            payroll: [],
            open: false,
            date: '',
            driver: '',
            amount: 0,
            id: 0
        }
    }
    componentDidMount() {
        this.getAllPayroll();
    }

    onOpenModal = payment => {
        this.setState({
            open: true,
            date: payment.date,
            driver: payment.driver_name,
            amount: payment.amount,
            id: payment.id
        })
    }

    onCloseModal = () => {
        this.setState({ open: false })
    }

    getAllPayroll = () => {
        axios.get('/api/payroll')
            .then(res => {
                console.log(res);
                this.setState({ payroll: res.data, open: false })
            })
            .catch(err => console.log(err))
    }

    onInputChange = event => this.setState({ [event.target.name]: event.target.value })

    updatePayroll = event => {
        event.preventDefault();
        let { date, driver, amount, id } = this.state;
        axios.put(`/api/payroll/${id}`, { date, driver, amount })
            .then(() => {
                this.getAllPayroll();
            })
    }

    deletePayroll = payrollId => {
        axios.delete(`/api/payroll/${payrollId}`)
            .then(() => this.getAllPayroll())
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div className="component-payroll-table container">
                <Modal classNames={{ modal: 'custom-modal' }} open={this.state.open} onClose={this.onCloseModal} center>
                    <h2>Edit Payment</h2>
                    <form onSubmit={event => this.updatePayroll(event)} className="edit-driver-form">
                        <div className="form-group">
                            <h6 className="driver">Date</h6>
                            <input name='date' onChange={this.onInputChange} value={this.state.date} className="form-control" type="text" />
                        </div>
                        <div className="form-group">
                            <h6>Driver </h6>
                            <input onChange={this.onInputChange} name='driver' value={this.state.driver} className="form-control" type="text" />
                        </div>
                        <div className="form-group">
                            <h6>Amount</h6>
                            <input onChange={this.onInputChange} name='amount' value={this.state.amount} className="form-control" type="text" />
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
                                {this.state.payroll.map(payment => {
                                    return (
                                        <tr key={payment.payroll_id}>
                                            <td><span>{payment.payroll_date}</span></td>
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