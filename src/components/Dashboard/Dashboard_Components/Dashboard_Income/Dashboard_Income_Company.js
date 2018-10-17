import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

let data = {
    datasets: [
        {
            label: 'Company',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            hoverBackroundColor: 'rgba(75,192,192,0.4)',
            hoverBorderColor: 'rgba(75,192,192,1)'
        }
    ]
};

class Dashboard_Income_Company extends Component {
    constructor() {
        super();
        this.state = {
            resetState: false
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.year !== this.props.year) {
            axios.get('/api/income/companies/sum?year=' + this.props.year )
                .then(res => {
                    let labels = [];
                    let sumPerCompany = [];
                    res.data.forEach(company => {
                        labels.push(company.company_name);
                        sumPerCompany.push(company.sum);
                    });
                    data.labels = labels;
                    data.datasets[0].data = sumPerCompany;
                    this.setState({ resetState: !this.state.resetState })

                })
                .catch(err => console.log(err))
        }
    }

    render() {
        return (
            <div>
                <Bar
                    data={data}
                    height={275}
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

export default Dashboard_Income_Company;