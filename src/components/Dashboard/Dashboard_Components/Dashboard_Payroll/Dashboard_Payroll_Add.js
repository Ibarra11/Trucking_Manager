import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'flatpickr/dist/themes/material_green.css'
import Flatpickr from 'react-flatpickr'
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
class Dashboard_Payroll_Add extends Component {
    constructor() {
        super();
        this.state = {
            date: moment().format("YYYY-MM-DD"),
            driver: '',
            amount: 0,
            drivers: [],
        }
    }

    componentDidMount() {
        axios.get('/api/drivers')
            .then(res =>
                this.setState({
                    drivers: res.data,
                    driver: res.data[0].name
                }
                ))
            .catch(err => console.log(err))
    }

    onTextChange = event => this.setState({ [event.target.name]: event.target.value });

    onSelectChange = event => this.setState({ driver: event.target.value });
    addPayroll = event => {
        event.preventDefault();
        let { date, driver, amount } = this.state;
        axios.post('/api/payroll', { date, driver, amount })
            .then(() => this.props.history.goBack())
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div className="component-payroll-add">
                <form onSubmit={event => this.addPayroll(event)}>
                    <h4>Add Payment</h4>
                    <div className="form-group">
                        <label htmlFor="">Date</label>
                        <input onChange={this.onTextChange} name='date' type="text" className="form-control" type='date'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Driver</label>
                        <select onChange={this.onSelectChange} className="form-control">
                            {this.state.drivers.map(driver => {
                                return (
                                    <option key={driver.name} value={driver.name}>{driver.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Amount</label>
                        <input value={this.state.amount} onChange={this.onTextChange} name="amount" className="form-control" type="text" />
                    </div>
                    <div className="submit-payroll">
                        <button className="btn" type="submit">Submit Payment</button>
                        <Link to={() => this.props.history.goBack()}><button className="btn">Cancel</button></Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default Dashboard_Payroll_Add;