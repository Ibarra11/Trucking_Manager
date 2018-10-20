import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
class Dashboard_Payroll_Add extends Component {
    constructor() {
        super();
        this.state = {
            date: moment(),
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
    handleDateChange = date => this.setState({ date })
    onSelectChange = event => this.setState({ driver: event.target.value });

    addPayroll = event => {
        event.preventDefault();
        let { date, driver, amount } = this.state;
        let formattedDate = moment(date).format('MM DD YYYY').split(' ');
        let month = +formattedDate[0];
        let day = +formattedDate[1];
        let year = +formattedDate[2];
        axios.post('/api/payroll', { month, day, year, driver, amount })
            .then(() => this.props.history.push('/dashboard/payroll'))
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div className="component-payroll-add">
                <form onSubmit={event => this.addPayroll(event)}>
                    <div className="form-header">
                        <h4>Add Payment</h4>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Date</label>
                        <DatePicker className="form-control"
                            selected={this.state.date}
                            onChange={this.handleDateChange}
                        />
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
                    <div className="form-submit">
                        <button className="btn btn-secondary" type="submit">Submit Payment</button>
                        <button onClick={() => this.props.history.push('/dashboard/payroll')} className="btn btn-secondary">Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Dashboard_Payroll_Add;