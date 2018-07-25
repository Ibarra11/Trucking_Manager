import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class Dashboard_Payroll_Table extends Component {
    constructor() {
        super();
        this.state = {
            payroll: []
        }
    }
    componentDidMount() {
        axios.get('/api/payroll')
            .then(res => {
                if (res.data.length - 1 > 4) {
                    let payments = res.data.splice(0, 5);
                    this.setState({ payroll: payments })
                }
                else {
                    this.setState({ payroll: res.data })
                }

            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-container card">
                            <div className="table-heading">
                                <h6>Latest 5 Payments</h6>
                            </div>
                            <table className="table table-bordered table-sm">
                                <thead>
                                    <th>Date</th>
                                    <th>Driver</th>
                                    <th>Amount</th>
                                </thead>
                                <tbody>
                                    {this.state.payroll.map(payment => {
                                        return (
                                            <tr key={payment.id}>
                                                <td>{payment.date}</td>
                                                <td>{payment.driver_name}</td>
                                                <td>{payment.amount}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div className="table-controls card-footer">
                                <Link to='/dashboard/payroll/add'><button><i className="fa fa-plus"></i> Payment</button></Link>
                                <button><i className="fa fa-eye"></i> View All</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard_Payroll_Table;