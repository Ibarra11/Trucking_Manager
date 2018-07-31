import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import { Link } from 'react-router-dom';
import axios from 'axios';
class Dashboard_Expenses extends Component {

    constructor() {
        super();
        this.state = {
            expenses: [],
            open: false
        }
    }
    onOpenModal = income => {
        console.log(income);
        this.setState({
            open: true,
            date: income.date,
            company: income.company,
            amount: income.amount,
            check: income.check_number,
            id: income.id
        })
    }
    onCloseModal = () => {
        this.setState({ open: false })
    }
    componentDidMount() {
        this.getAllExpenses();
    }

    getAllExpenses = () => {
        axios.get('/api/expenses')
            .then(res => this.setState({ expenses: res.data }))
            .catch(err => console.log(err))
    }

    deleteExpense = expenseId => {
        axios.delete(`/api/expense/${expenseId}`)
            .then(() => this.getAllExpenses())
            .catch((err) => console.log(err))
    }

    updateExpense = expenseId => {
        axios.put(`/api/expense/${expenseId}`)
            .then(() => this.getAllExpenses())
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="component-expenses">
                <Modal classNames={{ modal: 'custom-modal' }} open={this.state.open} onClose={this.onCloseModal} center>
                    <h2>Edit Income</h2>
                    <form onSubmit={event => this.updateIncome(event)} className="edit-driver-form">
                        <div className="form-group">
                            <h6 className="driver">Date</h6>
                            <input name='date' onChange={this.onInputChange} value={this.state.date} className="form-control" type="text" />
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
                            <input onChange={this.onInputChange} name='check' value={this.state.check} className="form-control" type="text" />
                        </div>
                        <div className="edit-form-buttons">
                            <button type='submit' className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </Modal>
                <h4>Expenses</h4>
                <div className="expenses-header">
                    <div className="expense-controls">
                        <Link to='/dashboard/expenses/add/expense'><button className="btn"><i className="fa fa-plus"></i> Add Expense</button></Link>
                        <Link to='/dashboard/expenses/add/category'> <button className="btn"><i className="fa fa-plus"></i> Add Category</button></Link>
                    </div>
                    <div className="expenses-search">
                        <input className="form-control" type="text" />
                        <button className="btn"><i className="fa fa-search"></i></button>
                    </div>
                </div>
                <div className="expenses-table ">
                    <table className="table table-bordered">
                        <thead>
                            <td>Date</td>
                            <td>Category</td>
                            <td>Truck</td>
                            <td>Amount</td>
                            <td>Actions</td>
                        </thead>
                        <tbody>
                            {this.state.expenses.map(expense => {
                                return (
                                    <tr key={expense.id}>
                                        <td>{expense.date}</td>
                                        <td>{expense.category}</td>
                                        <td>{expense.truck}</td>
                                        <td>{expense.amount}</td>
                                        <td className="actions">
                                            <button onClick={this.onOpenModal()} className="btn btn-primary"><i className="fa fa-edit"></i></button>
                                            <button onClick={() => this.deleteExpense(expense.id)} className="btn btn-danger"><i className="fa fa-trash"></i></button>
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
}

export default Dashboard_Expenses;