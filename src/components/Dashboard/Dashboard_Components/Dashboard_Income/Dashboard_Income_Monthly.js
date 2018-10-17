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

class Dashboard_Income_Monthly extends Component {
    constructor() {
        super();
        this.state = {
            resetState: false
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.year !== prevProps.year) {
            let incomePerMonth = [];
            axios.get('/api/income/monthly?year=' + this.props.year)
                .then(res => {
                    let months = [];
                    for (let i = res.data.length - 1; i >= 0; i--) {
                        months.push(res.data[i].month)
                    }
                    for (let i = 1; i <= 12; i++) {
                        if (!months.includes(i)) {
                            incomePerMonth.push(0)
                        }
                        else {
                            let monthSum = res.data.pop().sum;
                            incomePerMonth.push(monthSum)
                        }
                    }
                    data.datasets[0].data = incomePerMonth;
                    this.props.setMonths(months.length)
                    this.setState({ resetState: !this.state.resetState })
                })
                .catch(err => console.log(err))
        }
    }

    render() {
        return (
            <div className="component-income-chart">
                <Line
                      options={{
                        maintainAspectRatio: false,
                        legend: {
                            labels: {
                                fontColor: '#fff',
                                fontSize: 16
                            }
                        },
                        scales:{
                            yAxes:[{
                                ticks:{
                                    fontColor: '#fff',
                                    fontSize: 12
                                }
                            }],
                            xAxes:[{
                                ticks:{
                                    fontColor: '#fff',
                                    fontSize: 12
                                }
                            }]
                        }

                    }}
                    data={data}
                    height={275}
                />
            </div>
        )
    }
}

export default Dashboard_Income_Monthly;