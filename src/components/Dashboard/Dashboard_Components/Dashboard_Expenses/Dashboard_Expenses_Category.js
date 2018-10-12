import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

let data = {
    datasets: [
        {
            label: 'Category',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
        }
    ]
};

class Dashboard_Expenses_Category extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            sumPerCategory: [],
            resetState: false
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.year !== prevProps.year) {
            this.getExpensesPerCategory();
        }
    }

    getExpensesPerCategory = () => {
        axios.get('/api/expenses/categories/sum?year=' + this.props.year)
            .then(res => {
                let expenseData = [];
                let labels = [];
                res.data.forEach(expense => {
                    expenseData.push(expense.sum)
                    labels.push(expense.expense_category);
                })
                data.labels = labels;
                data.datasets[0].data = expenseData;
                this.setState({ resetState: !this.state.resetState })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <Bar
                    data={data}
                    height={200}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        );
    }
}

export default Dashboard_Expenses_Category;