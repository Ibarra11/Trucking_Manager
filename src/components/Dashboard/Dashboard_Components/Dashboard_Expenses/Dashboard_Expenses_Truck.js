import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

let data = {
    datasets: [
        {
            label: 'Cost/Truck',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            hoverBackroundColor: 'rgba(75,192,192,0.4)',
            hoverBorderColor: 'rgba(75,192,192,1)'
        }
    ]
};

class Dashboard_Expenses_Truck extends Component {
    constructor() {
        super();
        this.state = {
            resetState: false
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.year !== this.props.year) {
            this.getExpensePerTruck();
        }
    }
    getExpensePerTruck = () => {
        axios.get('/api/expenses/trucks/sum?year=' + this.props.year)
            .then(res => {
                let units = [];
                let sumPerTruck = [];
                res.data.forEach(truck => {
                    units.push('Unit #' + truck.unit_number);
                    sumPerTruck.push(truck.sum)
                })

                data.labels = units;
                data.datasets[0].data = sumPerTruck;
                this.setState({ resetState: !this.resetState })
            })
    }
    componentDidMount() {

    }
    render() {
        return (
            <div>
                <Bar
                    data={data}
                    height={200}
                    options={{
                        maintainAspectRatio: false,
                        legend: {
                            labels: {
                                fontColor: '#fff',
                                fontSize: 16
                            }
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    fontColor: '#fff',
                                    fontSize: 12
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontColor: '#fff',
                                    fontSize: 12
                                }
                            }]
                        }
                    }}
                />
            </div>
        );
    }
}

export default Dashboard_Expenses_Truck;