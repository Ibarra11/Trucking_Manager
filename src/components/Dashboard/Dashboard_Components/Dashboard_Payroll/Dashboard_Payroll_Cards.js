import React, { Component } from 'react';
import axios from 'axios';
class Dashboard_Payroll_Cards extends Component {

    constructor() {
        super();
        this.state = {
            totalPayroll: 0,
            numberOfPayments: 0,
            average: 0
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.year !== this.props.year) {
            this.getPayrollTotal();
            this.getNumberOfPayrollPayments();
            this.getNumberOfMonths();
        }
    }

    getPayrollTotal = () => {
        axios.get('/api/payroll/total?year=' + this.props.year)
            .then(res => {
                this.setState({ totalPayroll: res.data[0].Total })
            })
            .catch(err => console.log(err))
    }

    getNumberOfPayrollPayments = () => {
        axios.get('/api/payroll/payments?year=' + this.props.year)
            .then(res => {
                this.setState({ numberOfPayments: res.data[0].count })
            })
            .catch(err => console.log(err));
    }

    getNumberOfMonths = () =>{
        axios.get('/api/payroll/monthly?year=' +  this.props.year)
        .then(res =>{
            this.setState({average: Math.round(this.state.totalPayroll / res.data.length)})
        })
        .catch(err => console.log(err));
    }

    calculatePayroll = () => {
        if (this.state.numberOfPayments > 0) {
            return Math.round(this.state.totalPayroll / 12)
        }
        return 0;
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
                                <h6>{this.state.average}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard_Payroll_Cards;