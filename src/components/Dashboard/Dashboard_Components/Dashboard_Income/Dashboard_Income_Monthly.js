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
    componentDidMount() {
        let sumArray = [];
        axios.get('/api/payroll/monthly')
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    sumArray.push(res.data[i].sum)
                }
                data.datasets[0].data = sumArray;
                this.setState({ resetState: !this.state.resetState })
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="component-income-chart">
                <Line
                    options={{
                        maintainAspectRatio: false,
                    }}
                    data={data}
                    height={275}
                />
            </div>
        )
    }
}

export default Dashboard_Income_Monthly;