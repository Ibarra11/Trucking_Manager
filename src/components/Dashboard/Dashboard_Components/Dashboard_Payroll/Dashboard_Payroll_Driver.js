import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
let data = {
    datasets: [
        {
            label: 'Amount/Driver',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
        }
    ]
};

class Dashboard_Payroll_Driver extends Component {
    constructor() {
        super();
        this.state = {
            resetState: false
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.year !== prevProps.year) {
            axios.get('/api/payroll/drivers?year=' + this.props.year)
                .then(res => {
                    let labels = [];
                    let payrollPerDriver = [];
                    res.data.forEach(driver => {
                        labels.push(driver.name);
                        payrollPerDriver.push(driver.sum)
                    })
                    data.labels = labels;
                    data.datasets[0].data = payrollPerDriver;
                    this.setState({ resetState: !this.state.resetState })
                })
                .catch(err => console.log(err))
        }
    }
   
    render() {
        return (
            <div className="component-payroll-chart">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Bar
                                data={data}
                                options={{
                                    maintainAspectRatio: false
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard_Payroll_Driver;