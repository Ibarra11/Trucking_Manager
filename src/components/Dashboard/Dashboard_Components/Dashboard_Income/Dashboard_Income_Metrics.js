import React, { Component } from 'react';
import Dashboard_Income_Monthly from './Dashboard_Income_Monthly';
import Dashboard_Income_Company from './Dashboard_Income_Company';
import axios from 'axios';
import numeral from 'numeral';
class Dashbaord_Income_Metrics extends Component {
    constructor() {
        super();
        this.state = {
            totalIncome: 0,
            avgIncome: 0,
            months: 0,
            incomeYears: [],
            incomeYear: 0
        }
    }

    componentDidMount() {
        this.getIncomeYears();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.incomeYear !== this.state.incomeYear) {
            this.getTotalIncome();
        }
    }


    getTotalIncome = () => {
        axios.get('/api/income/total?year=' + this.state.incomeYear)
            .then(res => {
                this.setState({ totalIncome: res.data[0].sum })
            })
            .catch(err => console.log(err));
    }

    setMonths = months => {
        this.setState({ months })
    }

    handleYearChange = e => {
        let year = parseInt(e.target.value);
        this.setState({ incomeYear: year })
    }

    getIncomeYears = () => {
        axios.get('/api/income/years')
            .then(res => {
                this.setState({ incomeYears: res.data, incomeYear: res.data[0].year })
            })
            .catch(err => console.log(err))
    }

    render() {
        console.log(this.state);
        return (
            <div className="income-view">
                <div className="income-year">
                    <div className="input-group">
                        <label htmlFor="">Income Year</label>
                        <select onChange={this.handleYearChange}>
                            <option key={this.state.incomeYear} value={this.state.incomeYear}>{this.state.incomeYear}</option>
                            {this.state.incomeYears.map(incomeYear => {
                                if (incomeYear.year !== this.state.incomeYear) {
                                    return <option key={incomeYear.year} value={incomeYear.year}>{incomeYear.year}</option>
                                }
                            })}
                        </select>
                    </div>
                </div>
                <div className="card-body">
                    <div className="stats container">
                        <div className="row">
                            <div className="col-md-4 card">
                                <h6>Total Income</h6>
                                <p>{numeral(this.state.totalIncome).format('$0,0.00')}</p>
                            </div>
                            <div className="col-md-4 card">
                                <h6>Avg Income/Month</h6>
                                <p>{numeral(this.state.totalIncome / this.state.months).format('$0,0.00')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="graphs">
                        <div className="income-monthly">
                            <h5>Income Per Month</h5>
                            <Dashboard_Income_Monthly setMonths={this.setMonths} year={this.state.incomeYear} />
                        </div>
                        <div className="income-monthly">
                            <h5>Income Per Company</h5>
                            <Dashboard_Income_Company year={this.state.incomeYear} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashbaord_Income_Metrics;