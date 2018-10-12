import React, { Component } from 'react';
import Dashboard_Expenses_Category from './Dashboard_Expenses_Category';
import Dashboard_Expenses_Truck from './Dashboard_Expenses_Truck';
import Dashboard_Expenses_Total from './Dashboard_Expenses_Total';
import axios from 'axios';
import numeral from 'numeral';

class Dashboard_Expenses_Metrics extends Component {
    constructor() {
        super();
        this.state = {
            totalExpenses: 0,
            avgExpense: 0,
            expenseYears: [],
            expenseYear: ""
        }

    }

    componentDidMount() {

        // axios.get('/api/expenses/avg')
        //     .then(res => this.setState({ avgExpense: res.data[0].Avg }))
       //     .catch(err => console.log(err))
       this.getIncomeYears();
    }

   componentDidUpdate(prevProps, prevState){
    if(this.state.expenseYear !== prevState.expenseYear){
        this.getTotalIncome();
    }
   }

    getTotalIncome = () => {
        console.log(this.state);
        axios.get('/api/expenses/total?year=' + this.state.expenseYear)
            .then(res => this.setState({ totalExpenses: res.data[0].sum }))
            .catch(err => console.log(err))
    }

    getIncomeYears = () => {
        axios.get('/api/expenses/years')
            .then(res => {
                this.setState({ expenseYears: res.data, expenseYear: res.data[0].year })
            })
            .catch(err => console.log(err))
    }

    handleYearChange = event => {
        let expenseYear = +event.target.value;
        this.setState({ expenseYear })
    }

    render() {
        return (
            <div className="component-expenses">
                <div className="component-expenses-view">
                    <div className="expenses-overview">
                        <div className="expenses-metrics-header">
                            <div className="input-group">
                                <label htmlFor="">Income Year</label>
                                <select onChange={this.handleYearChange}>
                                    <option key={this.state.expenseYear} value={this.state.expenseYear}>{this.state.expenseYear}</option>
                                    {this.state.expenseYears.map(expenseYear => {
                                        if (expenseYear.year !== this.state.expenseYear) {
                                            return <option key={expenseYear.year} value={expenseYear.year}>{expenseYear.year}</option>
                                        }
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="container">
                            <div className="expenses-metrics-layout row">
                                <div className="expenses-metrics-overall col-md-12">
                                    <div className="card col-md-4">
                                        <h6>Expenses Total</h6>
                                        <p>{numeral(this.state.totalExpenses).format('$0,0.00')}</p>
                                    </div>
                                    <div className="card col-md-4">
                                        <h6>Avg Expense/Month</h6>
                                        <p>{numeral(this.state.avgExpense).format('$0,0.00')}</p>
                                    </div>
                                </div>
                                <div className="expense-metrics-graphs col-md-12">
                                    {/* <div className="graph">
                                        <h5>Expenses Per Month</h5>
                                        <Dashboard_Expenses_Total />
                                    </div>

                                    <div className="graph">
                                        <h5>Expenses Per Cagtegory</h5>
                                        <Dashboard_Expenses_Category />

                                    </div>
                                    <div className="graph">
                                        <h5>Expenses Per Truck</h5>
                                        <Dashboard_Expenses_Truck />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard_Expenses_Metrics;