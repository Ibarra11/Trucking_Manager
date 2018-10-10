import React, { Component } from 'react';
import axios from 'axios';
class Dashboard_Add_Expense extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            trucks: [],
            truck: '',
            category: '',
            date: '',
            amount: ''
        }
    }
    componentDidMount() {
        axios.get('/api/expenses/categories')
            .then(res => this.setState({
                categories: res.data,
                category: res.data[0].type
            }))
        axios.get('/api/trucks')
            .then(res => {
                console.log(res);
                this.setState({
                    trucks: res.data,
                    truck: res.data[0].unit_number
                })
            })
            .catch(err => console.log(err))
    }

    addExpense = event => {
        event.preventDefault();
        let { date, category, truck, amount } = this.state;
        axios.post('/api/expenses', {
            date, category, truck, amount
        })
            .then(() => this.props.history.goBack())
            .catch(err => console.log(err))
    }

    onTextChange = event => this.setState({ [event.target.name]: event.target.value });

    onCategoryChange = event => this.setState({ category: event.target.value })

    onTruckChange = event => this.setState({ truck: event.target.value })

    render() {
        return (
            <div className="component-add-expense">
                <div className=" card card-body">
                    <div className="form-header">
                        <h5>Add Expense</h5>
                    </div>

                    <form onSubmit={event => this.addExpense(event)}>
                        <div className="form-group">
                            <label>Date</label>
                            <input onChange={this.onTextChange} name='date' className="form-control" type="date" />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select onChange={this.onCategoryChange} className="form-control">
                                {this.state.categories.map((category, index) => {
                                    return (
                                        <option key={category.type + index} value={category.type}>{category.type}</option>
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
                            <input name="amount" onChange={this.onTextChange} className="form-control" type="text" />
                        </div>
                        <div className="expense-submit">
                            <button type='submit' className="btn">Add Expense</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Dashboard_Add_Expense;