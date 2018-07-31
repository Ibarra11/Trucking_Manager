import React, { Component } from 'react';
import axios from 'axios';
class Dashboard_Payroll_Cards extends Component {

    constructor() {
        super();
        this.state = {
            totalPayroll: 0,
            numberOfPayments: 0
        }
    }

    componentDidMount() {
        axios.get('/api/payroll/total')
            .then(res => {
                this.setState({ totalPayroll: res.data[0].Total })
            })
            .catch(err => console.log(err))
        axios.get('/api/payroll/payments')
        .then(res => this.setState({numberOfPayments: res.data[0].count}))
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="payroll-cards">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <h5>Total</h5>
                                <h6>$ {this.state.totalPayroll}</h6>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="card">
                                <h5># Of Payments</h5>
                                <h6>{this.state.numberOfPayments}</h6>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="card">
                                <h5>Average/Month</h5>
                                <h6>$720.45</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard_Payroll_Cards;