import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import Pagination from '../../../../utilities/Pagination';
import Filter from '../../../../utilities/Filter';
import Numeral from 'numeral';
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
        };
        this.pagination = new Pagination([], 8);
        this.currentPage = 1;
        this.categoryOrder = {
            date: 'ASC',
            amount: ''
        };
    }

    componentDidMount() {
        this.getAllIncome();
    }

    onOpenModal = income => {
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
                if (res.data.length > 0) {
                    this.pagination.itemList = res.data;
                    this.pagination.calculateNumOfPages();
                    let incomeList = this.pagination.displayItemsOnPage(this.currentPage);
                    this.setState({ incomeList })
                }

            })
            .catch(err => console.log(err));
    }

    deleteIncome = incomeId => {
        axios.delete(`/api/income/${incomeId}`)
            .then(() => this.getAllIncome())
            .catch(err => console.log(err))
    }

    filterCategory = (fn, category, order) => {
        if (category === 'date' && this.categoryOrder[category] !== order) {
            this.categoryOrder[category] = order;
            let filteredResults = fn(this.pagination.itemList);
            this.pagination.itemList = filteredResults;
            this.updatePageItems();
        }
        else if (category === 'amount' && this.categoryOrder[order] !== order) {
            this.categoryOrder[category] = order;
            let filteredResults = fn(this.pagination.itemList, order, 'check_amount');
            this.pagination.itemList = filteredResults;
            this.updatePageItems();
        }
    }


    updateIncome = event => {
        event.preventDefault();
        let { check_date, company, amount, check_number, income_id } = this.state;
        axios.put(`/api/income/${income_id}`, { check_date, company, amount, check_number })
            .then(() => {
                this.getAllIncome();
                this.onCloseModal();
            })
            .catch(err => console.log(err))
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

    onInputChange = event => this.setState({ [event.target.name]: event.target.value });

    render() {
        return (
            <div className="component-income-list">
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
                <div className="table-container">
                    <div className="table-header">
                        <h4>Income Records</h4>
                        <div className="table-add">
                            <button onClick={() => this.props.history.push('/dashboard/income/add')} className="btn"><i className="fa fa-plus"></i> Income</button>
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
                                <th>Company</th>
                                <th className="category">
                                    <div className="category-type">
                                        <p>Amount</p>
                                    </div>
                                    <div className="filter-icons">
                                        <i onClick={() => this.filterCategory(Filter.amount, 'amount', 'ASC')} className={'fa fa-caret-up'}></i>
                                        <i onClick={() => this.filterCategory(Filter.amount, 'amount', 'DESC')} className={'fa fa-caret-down'}></i>
                                    </div>
                                </th>
                                <th>Check #</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.incomeList.map(income => {
                                let { day, month, year } = income;
                                if (month < 10) {
                                    month = '0' + month;
                                }
                                if (day < 10) {
                                    day = '0' + day
                                }
                                return (
                                    <tr key={income.income_id}>
                                        <td>{month + '/' + day + '/' + year}</td>
                                        <td>{income.company_name}</td>
                                        <td>{Numeral(income.check_amount).format('0,0.00')}</td>
                                        <td>{income.check_number}</td>
                                        <td className="table-buttons">
                                            <button onClick={() => this.onOpenModal(income)} className="btn btn-primary"><i className="fa fa-edit"></i></button>
                                            <button onClick={() => this.deleteIncome(income.income_id)} className="btn btn-danger"><i className="fa fa-trash"></i></button>
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

export default Dashboard_Income_List;
