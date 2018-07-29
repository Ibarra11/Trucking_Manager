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

class Dashboard_Income_Company extends Component {
    constructor(){
        super();
        this.state = {
            resetState : false
        }
    }

    componentDidMount(){
        axios.get('/api/income/companies/sum')
        .then(res => {
            let labels = [];
            let sumPerCompany = [];
            res.data.forEach(company =>{
                labels.push(company.name);
                sumPerCompany.push(company.sum);
            });
            data.labels = labels;
            data.datasets[0].data = sumPerCompany;
            this.setState({resetState: !this.state.resetState})

        })
        .catch(err => console.log(err))
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