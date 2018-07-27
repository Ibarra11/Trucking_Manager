import React, { Component } from 'react';
import Dashboard_Income_Monthly from './Dashboard_Income_Monthly';
import Dashboard_Income_Company from './Dashboard_Income_Company';
import axios from 'axios';
class Dashboard_Income extends Component {
    constructor() {
        super();
        this.state = {
            income: []
        }
    }

    componentDidMount() {
        axios.get('/api/income')
            .then(res => {
                console.log(res.data);
                this.setState({ income: res.data })
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="component-income">
                <div className="card">
                    <div className="card-header">
                        <h3>Income</h3>
                    </div>
                </div>
                <div className="income-view">
                    <div className="card">
                        <div className="card-header">
                            <h4>Metrics Overview</h4>
                        </div>
                        <div className="card-body">
                            <div className="stats">
                                <div className="total-income">
                                    <h6>Total Income</h6>
                                    <p>$20,345</p>
                                </div>
                                <div className="total-income">
                                    <h6>Avg Income/Month</h6>
                                    <p>$20,345</p>
                                </div>
                            </div>
                            <div className="graphs">
                                <div className="income-monthly">
                                    <h5>Income Per Month</h5>
                                    <Dashboard_Income_Monthly />
                                </div>
                                <div className="income-monthly">
                                    <h5>Income Per Company</h5>
                                    <Dashboard_Income_Company />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="income-table">
                    <div className="card">
                        <div className="card-header">
                            <h4>Income List</h4>
                            <button onClick={() => this.props.history.push('/dashboard/income/add')} className="btn"><i className="fa fa-plus"></i> Income</button>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <th>Date</th>
                                    <th>Company</th>
                                    <th>Amount</th>
                                    <th>Check #</th>
                                </thead>
                                <tbody>
                                    {this.state.income.map(e =>{
                                        return(
                                            <tr key={e.id}>
                                                <td>{e.date}</td>
                                                <td>{e.company}</td>
                                                <td>{e.amount}</td>
                                                <td>{e.check_number}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Dashboard_Income;