import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
class Dashboard_Add_Expense extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            trucks: [],
            expenseUnitNumber: 0,
            expenseCategory: '',
            expenseAmount: 0,
            expenseDate: moment()
        }
    }
    componentDidMount() {
        this.getExpenseCategories();
        this.getTruckUnits();
    }

    getExpenseCategories = () => {
        axios.get('/api/expenses/categories')
            .then(res => this.setState({
                categories: res.data,
                expenseCategory: res.data[0].category
            }))
    }

    getTruckUnits = () => {
        axios.get('/api/trucks')
            .then(res => {
                this.setState({
                    trucks: res.data,
                    expenseUnitNumber: res.data[0].unit_number
                })
            })
            .catch(err => console.log(err))
    }

    addExpense = event => {
        event.preventDefault();
        let { expenseDate, expenseCategory, expenseUnitNumber, expenseAmount } = this.state;
        let formatedDate = moment(expenseDate).format('MM DD YYYY').split(' ');
        let month = formatedDate[0];
        let day = formatedDate[1];
        let year = formatedDate[2];
        expenseAmount = parseFloat(expenseAmount);
        console.log(this.state);
        axios.post('/api/expenses', {
            expenseCategory, expenseUnitNumber, expenseAmount, month, day, year
        })
            .then(() => this.props.history.goBack())
            .catch(err => console.log(err))
    }

    onTextChange = e => this.setState({ [e.target.name]: e.target.value });

    onCategoryChange = e => this.setState({ expenseCategory: e.target.value })

    handleDateChange = date => {
        this.setState({ expenseDate: date })
    } 

    onTruckChange = e => this.setState({ expenseUnitNumber: e.target.value })

    render() {
        return (
            <div className="component-add-expense">
                <div className=" card card-body">
                    <div className="form-header">
                        <h5>Add Expense</h5>
                    </div>

                    <form onSubmit={this.addExpense}>
                        <div className="form-group">
                            <label>Date</label>
                            <DatePicker
                                className="form-control"
                                selected={this.state.expenseDate}
                                onChange={this.handleDateChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select onChange={this.onCategoryChange} className="form-control">
                                {this.state.categories.map(category => {
                                    return (
                                        <option key={category.category_id} value={category.category}>{category.category}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Truck</label>
                            <select onChange={this.onTruckChange} className="form-control">
                                {this.state.trucks.map(truck => {
                                    return (
                                        <option key={truck.unit_number} value={truck.unit_number}>{truck.unit_number}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Amount</label>
                            <input name="expenseAmount" value={this.state.expenseAmount} onChange={this.onTextChange} className="form-control" type="text" />
                        </div>
                        <div className="expense-submit">
                            <button type='submit' className="btn">Add </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Dashboard_Add_Expense;