import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import { Link } from 'react-router-dom';
import axios from 'axios';
class Dashboard_Expenses extends Component {

    constructor() {
        super();
        this.state = {
            expenses: []
        }
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
            .catch((err) => console.log(err) )
    }

    render() {
        return (
            <div className="component-expenses">
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
                                            <button className="btn btn-primary"><i className="fa fa-edit"></i></button>
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