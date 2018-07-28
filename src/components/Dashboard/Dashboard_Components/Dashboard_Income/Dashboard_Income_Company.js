import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

let data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Category',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

class Dashboard_Income_Company extends Component {
    constructor(){
        super();
        this.state = {
            categories: [],
            sumPerCategory: [],
            resetState : false
        }
    }
    componentDidMount(){
    }
    render() {
        return (
            <div>
                <Bar
                    data={data}
                    height = {275}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        );
    }
}

export default Dashboard_Income_Company;