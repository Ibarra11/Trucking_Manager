import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import Pagination from '../../../../utilities/Pagination';
import Filter from '../../../../utilities/Filter';
class Dashboard_Expenses_List extends Component {
    constructor() {
        super();
        this.state = {
            expenses: [],
            currentExpenseOnPage: [],
            open: false,
            expense_date: '',
            expense_category: '',
            unit_number: '',
            expense_amount: '',
            expense_id: 0
        }
        this.pagination = new Pagination([], 8);
        this.categoryOrder = {
            date: 'ASC',
            amount: ''
        };
        this.currentPage = 1;
    }

    componentDidMount() {
        this.getAllExpenses();
    }

    onOpenModal = expense => {
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
            .then(res => {
                if (res.data.length > 0) {
                    this.pagination.itemList = res.data;
                    this.pagination.calculateNumOfPages();
                    let expenseList = this.pagination.displayItemsOnPage(this.currentPage);
                    this.setState({ expenses: expenseList, open: false })
                }
            })
            .catch(err => console.log(err));
    }

    updatePageItems = () => {
        let expenseList = this.pagination.displayItemsOnPage(this.currentPage);
        this.setState({ expenses: expenseList })
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

    filterCategory = (fn, category, order) => {
        if (category === 'order' && this.categoryOrder[category] !== order) {
            this.categoryOrder[category] = order;
            let filteredResults = fn(this.pagination.itemList);
            this.pagination.itemList = filteredResults;
            this.updatePageItems();
        }
        else if (category === 'amount' && this.categoryOrder[order] !== order) {
            this.categoryOrder[category] = order;
            let filteredResults = fn(this.pagination.itemList, order);
            this.pagination.itemList = filteredResults;
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

    deleteExpense = expenseId => {
        axios.delete(`/api/expense/${expenseId}`)
            .then(() => this.getAllExpenses())
            .catch((err) => console.log(err))
    }

    onInputChange = event => this.setState({ [event.target.name]: event.target.value })

    updateExpense = event => {
        event.preventDefault();
        let { expense_date, expense_category, expense_amount, unit_number, expense_id } = this.state;
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
                <div className="table-container">
                    <div className="table-header">
                        <h4>Expense Records</h4>
                        <div className="table-add">
                            <button onClick={() => this.props.history.push('/dashboard/expenses/add')} className="btn"><i className="fa fa-plus"></i> Expense</button>
                        </div>
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            <tr className="category-row">
                                <th className="category">
                                    <div className="category-type">
                                        <p>Date</p>
                                    </div>
                                    <div className="filter-icons">
                                        <i onClick={() => this.filterCategory(Filter.date, 'date', 'ASC')} className={"fa fa-caret-up"}></i>
                                        <i onClick={() => this.filterCategory(Filter.date, 'date', 'DESC')} className={"fa fa-caret-down"}></i>
                                    </div>
                                </th>
                                <th>Category</th>
                                <th>Truck</th>
                                <th className="category">
                                    <div className="category-type">
                                        <p>Amount</p>
                                    </div>
                                    <div className="filter-icons">
                                        <i onClick={() => this.filterCategory(Filter.amount, 'amount', 'ASC')} className={'fa fa-caret-up'}></i>
                                        <i onClick={() => this.filterCategory(Filter.amount, 'amount', 'DESC')} className={'fa fa-caret-down'}></i>
                                    </div>
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.expenses.map(expense => {
                                let { month, day, year } = expense;
                                if (day < 10) {
                                    day = '0' + day;
                                }
                                if (month < 10) {
                                    month = '0' + month;
                                }
                                return (
                                    <tr key={expense.expense_id}>
                                        <td>{month + '/' + day + '/' + year}</td>
                                        <td>{expense.expense_category}</td>
                                        <td>{expense.unit_number}</td>
                                        <td>{expense.expense_amount}</td>
                                        <td className="table-buttons">
                                            <button onClick={() => this.onOpenModal(expense)} className="btn btn-primary"><i className="fa fa-edit"></i></button>
                                            <button onClick={() => this.deleteExpense(expense.expense_id)} className="btn btn-danger"><i className="fa fa-trash"></i></button>
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

export default Dashboard_Expenses_List;