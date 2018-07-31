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
            totalIncome: 0,
            totalExpenses: 0,
            revenue: 0
        }
        let totalExpenses = 0;
        let totalIncome = 0;
        let revenue = 0;
        axios.get('/api/expenses/total')
            .then(res => {
                totalExpenses = res.data[0].sum;
            })
            .catch(err => console.log(err))
        axios.get('/api/income/total')
            .then(res => {
                totalIncome = res.data[0].sum;
                revenue = totalIncome - totalExpenses;
                data.datasets[0].data = [revenue, totalIncome, totalExpenses];
                this.setState({ totalIncome: totalIncome, totalExpenses: totalExpenses, revenue: revenue })
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
                            <p>{numeral(this.state.totalIncome).format('$0,0.00')}</p>
                        </div>
                        <div className="card">
                            <h6>Total Expenses</h6>
                            <p>{numeral(this.state.totalExpenses).format('$0,0.00')}</p>
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