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
            revenue: 0
        }
        // let totalExpenses = 0;
        // let totalIncome = 0;
        // let revenue = 0;
    }

    componentDidMount() {
        this.calculateRevenue();
    }

    calculateRevenue = async () => {
        let expenses = await this.getTotalExpenses();
        let income = await this.getTotalIncome();
        console.log(expenses);
        console.log(income)
        let revenue = income - expenses;
        data.datasets[0].data = [revenue, income, expenses];
        this.setState({ income, expenses, revenue })
    }

    getTotalExpenses() {
        return axios.get('/api/expenses/total')
            .then(res => {
                console.log(res);
                return res.data[0].sum;
            })
            .catch(err => console.log(err))
    }
    getTotalIncome() {
        return axios.get('/api/income/total')
            .then(res => {
                return res.data[0].sum;
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="component-home-metrics">
                <h5>Revenue Overview</h5>
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