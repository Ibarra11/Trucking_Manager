import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-responsive-modal';
class Dashboard_Expenses_List extends Component {
    constructor() {
        super();
        this.state = {
            expenses: [],
            open: false,
            expense_date: '',
            expense_category: '',
            unit_number: '',
            expense_amount: '',
            expense_id: 0
        }
    }

    componentDidMount() {
        this.getAllExpenses();
    }

    onOpenModal = expense => {
        console.log(expense);
        let { expense_date, expense_category, expense_amount, unit_number, expense_id } = expense;
        this.setState({
            open: true, expense_date, expense_category, unit_number, expense_amount, expense_id
        })
    }
    onCloseModal = () => {
        this.setState({ open: false })
    }

    getAllExpenses = () => {
        axios.get('/api/expenses')
            .then(res => this.setState({ expenses: res.data, open: false }))
            .catch(err => console.log(err));
    }

    deleteExpense = expenseId => {
        axios.delete(`/api/expense/${expenseId}`)
            .then(() => this.getAllExpenses())
            .catch((err) => console.log(err))
    }

    onInputChange = event => this.setState({ [event.target.name]: event.target.value })

    updateExpense = event => {
        event.preventDefault();
        let { expense_date, expense_category, expense_amount, unit_number, expense_id } = this.state;
        console.log(this.state);
        axios.put(`/api/expense/${expense_id}`, { expense_date, expense_category, expense_amount, unit_number, expense_id })
            .then(() => this.getAllExpenses())
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="component-expense-list">
                <Modal classNames={{ modal: 'custom-modal' }} open={this.state.open} onClose={this.onCloseModal} center>
                    <h2>Edit Expense</h2>
                    <form onSubmit={event => this.updateExpense(event)} className="edit-driver-form">
                        <div className="form-group">
                            <h6 className="driver">Date</h6>
                            <input name='expense_date' onChange={this.onInputChange} value={this.state.expense_date} className="form-control" type="date" />
                        </div>
                        <div className="form-group">
                            <h6>Category</h6>
                            <input onChange={this.onInputChange} name='expense_category' value={this.state.expense_category} className="form-control" type="text" />
                        </div>
                        <div className="form-group">
                            <h6>Truck</h6>
                            <input onChange={this.onInputChange} name='unit_number' value={this.state.unit_number} className="form-control" type="text" />
                        </div>
                        <div className="form-group">
                            <h6>Amount</h6>
                            <input onChange={this.onInputChange} name='expense_amount' value={this.state.expense_amount} className="form-control" type="text" />
                        </div>
                        <div className="edit-form-buttons">
                            <button type='submit' className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </Modal>
                <h4>Expense List</h4>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Truck</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.expenses.map(expense => {
                            return (
                                <tr key={expense.expense_id}>
                                    <td><span>{expense.expense_date}</span></td>
                                    <td><span>{expense.expense_category}</span></td>
                                    <td><span>{expense.unit_number}</span></td>
                                    <td><span>{expense.expense_amount}</span></td>
                                    <td className="table-buttons">
                                        <span>
                                            <button onClick={() => this.onOpenModal(expense)} className="btn btn-primary"><i className="fa fa-edit"></i></button>
                                            <button onClick={() => this.deleteExpense(expense.expense_id)} className="btn btn-danger"><i className="fa fa-trash"></i></button>
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="table-controls">
                    <button onClick={() => this.props.history.push('/dashboard/expenses/add')} className="btn"><i className="fa fa-plus"></i> Expense</button>
                </div>
            </div>
        )
    }
}

export default Dashboard_Expenses_List;