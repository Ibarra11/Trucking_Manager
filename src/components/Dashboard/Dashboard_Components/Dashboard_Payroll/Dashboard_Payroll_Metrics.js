import React, { Component } from 'react';
import Dashboard_Payroll_Cards from './Dashboard_Payroll_Cards';
import Dashboard_Payroll_Table from './Dashboard_Payroll_Table';
import Dashboard_Payroll_Chart from './Dashboard_Payroll_Chart';
import Dashboard_Payroll_Driver from './Dashboard_Payroll_Driver';
import axios from 'axios';
class Dashboard_Payroll_Metrics extends Component {
    constructor() {
        super();
        this.state = {
            payroll_years: [],
            year: 0
        }
    }
    componentDidMount() {
        axios.get('/api/payroll/years')
            .then(res => {
                this.setState({ payroll_years: res.data, year: res.data[0].year })

            })
            .catch(err => console.log(err))
    }
    handleYearChange = event => {
        let year = +event.target.value;
        this.setState({ year })
    }
    render() {
        return (
            <div className="component-payroll">
                <div className="container">
                    <div className='payroll-header'>
                        <h4>Payroll Metrics</h4>
                        <div className="form-group">
                            <label htmlFor="">Payroll Year</label>
                            <select onChange={this.handleYearChange}>
                                <option value={this.state.year}>{this.state.year}</option>
                                {this.state.payroll_years.map(payroll => {
                                    if (payroll.year !== this.state.year) {
                                        return <option key={payroll.year + Math.random()} value={payroll.year}>{payroll.year}</option>
                                    }
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="row payroll-container">
                        <div className="col-md-3">
                            <h6>Payroll Overview</h6>
                            <Dashboard_Payroll_Cards year={this.state.year} />
                        </div>
                        <div className="col-md-9">
                            <div className="chart">
                                <h6>Payroll per Month</h6>
                                <Dashboard_Payroll_Chart year={this.state.year} />
                            </div>
                            <div className="chart">
                                <h6>Payroll Per Driver</h6>
                                <Dashboard_Payroll_Driver year={this.state.year} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h4>Payroll List</h4>
                            <Dashboard_Payroll_Table />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Dashboard_Payroll_Metrics;