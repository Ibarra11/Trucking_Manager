import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import numeral from 'numeral';
import axios from 'axios';
const data = {
    labels: [
        'Revenue',
        'Income',
        'Expenses'
    ],
    datasets: [{
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};
class Dashboard_Home_Metrics extends Component {
    constructor() {
        super();
        this.state = {
            income: 0,
            expenses: 0,
            revenue: 0,
            incomeYears: [],
            selectedIncomeYear: ""
        }
    }

    componentDidMount() {
        // this.calculateRevenue();
        this.getIncomeYears();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedIncomeYear !== this.state.selectedIncomeYear) {
            this.calculateRevenue();
        }
    }

    calculateRevenue = async () => {
        let expenses = await this.getTotalExpenses();
        let income = await this.getTotalIncome();
        let revenue = income - expenses;
        data.datasets[0].data = [revenue, income, expenses];
        this.setState({ income, expenses, revenue })
    }

    getIncomeYears = () => {
        axios.get('/api/revenue/years')
            .then(res => {
                this.setState({
                    incomeYears: res.data, selectedIncomeYear: res.data[0].year
                })
            })
            .catch(err => console.log(err))
    }

    getTotalExpenses() {
        return axios.get('/api/expenses/total?year=' + this.state.selectedIncomeYear)
            .then(res => {
                return res.data[0].sum;
            })
            .catch(err => console.log(err))
    }
    getTotalIncome() {
        return axios.get('/api/income/total?year=' + this.state.selectedIncomeYear)
            .then(res => {
                return res.data[0].sum;
            })
            .catch(err => console.log(err));
    }

    handleYearChange = event => {
        let selectedIncomeYear = +event.target.value;
        this.setState({ selectedIncomeYear })
    }

    render() {
        return (
            <div className="component-home-metrics">
                <div className="metrics-header">
                    <h5>Revenue Overview</h5>
                    <div className="form-group">
                        <label htmlFor="">Year</label>
                        <select onChange={this.handleYearChange} >
                            <option key={this.state.selectedIncomeYear} value={this.state.selectedIncomeYear}>{this.state.selectedIncomeYear}</option>
                            {this.state.incomeYears.map(incomeYear => {
                                if (this.state.selectedIncomeYear !== incomeYear.year) {
                                    return <option key={incomeYear.year} value={incomeYear.year}>{incomeYear.year}</option>
                                }
                            })}
                        </select>
                    </div>
                </div>

                <div className="container">
                    <div className="col-md-4">
                        <div className="card">
                            <h6>Total Revenue</h6>
                            <p>{numeral(this.state.revenue).format('$0,0.00')}</p>
                        </div>
                        <div className="card">
                            <h6>Total Income</h6>
                            <p>{numeral(this.state.income).format('$0,0.00')}</p>
                        </div>
                        <div className="card">
                            <h6>Total Expenses</h6>
                            <p>{numeral(this.state.expenses).format('$0,0.00')}</p>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <Doughnut data={data} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard_Home_Metrics;