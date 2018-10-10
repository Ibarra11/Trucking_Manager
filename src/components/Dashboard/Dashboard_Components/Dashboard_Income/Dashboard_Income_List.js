import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-responsive-modal';

class Dashboard_Income_List extends Component {
    constructor() {
        super();
        this.state = {
            incomeList: [],
            check_date: '',
            company: '',
            amount: '',
            check_number: 0,
            income_id: 0,
            open: false
        }
        axios.get('/api/income')
            .then(res => {
                console.log(res);
                this.setState({ incomeList: res.data })
            })
            .catch(err => console.log(err));
    }

    onOpenModal = income => {
        console.log(income);
        this.setState({
            open: true,
            check_date: income.check_date,
            company: income.company,
            amount: income.amount,
            check_number: income.check_number,
            income_id: income.income_id
        })
    }

    onCloseModal = () => {
        this.setState({ open: false })
    }

    getAllIncome = () => {
        axios.get('/api/income')
            .then(res => {
                this.setState({ incomeList: res.data })
            })
            .catch(err => console.log(err));
    }

    deleteIncome = incomeId => {
        axios.delete(`/api/income/${incomeId}`)
            .then(() => this.getAllIncome())
            .catch(err => console.log(err))
    }

    updateIncome = event => {
        event.preventDefault();
        let { check_date, company, amount, check_number, income_id } = this.state;
        console.log(this.state)
        axios.put(`/api/income/${income_id}`, { check_date, company, amount, check_number })
            .then(() => {
                this.getAllIncome();
                this.onCloseModal();
            })
            .catch(err => console.log(err))
    }

    onInputChange = event => this.setState({ [event.target.name]: event.target.value });

    render() {
        return (
            <div className="income-table">
                <Modal classNames={{ modal: 'custom-modal' }} open={this.state.open} onClose={this.onCloseModal} center>
                    <h2>Edit Income</h2>
                    <form onSubmit={event => this.updateIncome(event)} className="edit-driver-form">
                        <div className="form-group">
                            <h6 className="driver">Date</h6>
                            <input name='check_date' onChange={this.onInputChange} value={this.state.check_date} className="form-control" type="text" />
                        </div>
                        <div className="form-group">
                            <h6>Company </h6>
                            <input onChange={this.onInputChange} name='company' value={this.state.company} className="form-control" type="text" />
                        </div>
                        <div className="form-group">
                            <h6>Amount</h6>
                            <input onChange={this.onInputChange} name='amount' value={this.state.amount} className="form-control" type="text" />
                        </div>
                        <div className="form-group">
                            <h6>Check #</h6>
                            <input onChange={this.onInputChange} name='check_number' value={this.state.check_number} className="form-control" type="text" />
                        </div>
                        <div className="edit-form-buttons">
                            <button type='submit' className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </Modal>
                <h4>Income List</h4>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Company</th>
                            <th>Amount</th>
                            <th>Check #</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.incomeList.map(income => {
                            return (
                                <tr key={income.income_id}>
                                    <td>{income.check_date}</td>
                                    <td>{income.company}</td>
                                    <td>{income.amount}</td>
                                    <td>{income.check_number}</td>
                                    <td>
                                        <button onClick={() => this.onOpenModal(income)} className="btn btn-primary"><i className="fa fa-edit"></i></button>
                                        <button onClick={() => this.deleteIncome(income.income_id)} className="btn btn-danger"><i className="fa fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="table-controls">
                    <button onClick={() => this.props.history.push('/dashboard/income/add')} className="btn"><i className="fa fa-plus"></i> Income</button>
                </div>
            </div>
        )
    }
}

export default Dashboard_Income_List;
