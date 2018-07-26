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
    constructor(){
        super();
        this.state = {
            categories: [],
            sumPerCategory: [],
            resetState : false
        }
    }
    componentDidMount(){
        axios.get('/api/expenses/categories')
        .then(res =>{
            let labels = [];
            res.data.forEach(category =>{
                labels.push(category.type)
            })
            this.setState({ resetState: !this.state.resetState})
            data.labels = labels;
        })
        .catch(err => console.log(err));

        axios.get('/api/expenses/categories/sum')
        .then(res => {
            let expenseData = [];
            res.data.forEach(expense =>{
                expenseData.push(expense.sum)
            })
            data.datasets[0].data = expenseData;
            this.setState({ resetState: !this.state.resetState})
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <h5>Expenses Per Category</h5>
                <Bar
                    data={data}
                    height={50}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        );
    }
}

export default Dashboard_Expenses_Category;