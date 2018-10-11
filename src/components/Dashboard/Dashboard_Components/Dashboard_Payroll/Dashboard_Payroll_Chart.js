import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
let data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: 'Total Paid / Month',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
        }
    ]
};

class Dashboard_Payroll_Chart extends Component {
    constructor() {
        super();
        this.state = {
            resetState: false
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.year !== this.props.year) {
            let sumArray = [];
            axios.get('/api/payroll/monthly?year=' + this.props.year)
                .then(res => {
                    let months = [];
                    for (let i = 0; i < res.data.length; i++) {
                        months.push(res.data[i].month);
                    }
                    for (let i = 1; i <= 12; i++) {
                        if (!months.includes(i)) {
                            sumArray.push(0)
                        }
                        else {
                            let month = res.data.pop();
                            sumArray.push(month.sum)
                        }
                    }

                    console.log(sumArray);
                    data.datasets[0].data = sumArray;
                    this.setState({ resetState: !this.state.resetState })
                })
                .catch(err => console.log(err));
        }
    }

    render() {
        return (
            <div className="component-payroll-chart">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Line
                                options={{
                                    maintainAspectRatio: false,
                                }}
                                data={data} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard_Payroll_Chart;