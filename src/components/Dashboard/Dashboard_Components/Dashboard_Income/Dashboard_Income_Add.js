import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';
class Dashboard_Income_Add extends Component {
    constructor() {
        super();
        this.state = {
            company: '',
            companyModal: '',
            companies: [],
            open: false,
            date: moment(),
            check_amount: 0,
            check_number: 0
        }
    }

    componentDidMount() {
        axios.get('/api/income/company')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({ companies: res.data, company: res.data[0].company_name })
                }
            })
            .catch(err => console.log(err))
    }


    onOpenModal = () => {
        this.setState({
            open: true,
        })
    }

    onCloseModal = () => {
        axios.get('/api/income/company')
            .then(res => this.setState({ companies: res.data, open: false }))
            .catch(err => console.log(err))
    }

    onCompanyChange = event => this.setState({ company: event.target.value });

    onInputChange = event => this.setState({ [event.target.name]: event.target.value });

    onDateChange = date => {
        this.setState({ date })
    }
    addCompany = () => {
        axios.post('/api/income/company', {
            company: this.state.companyModal
        })
            .then(() => {
                this.onCloseModal();
            })
    }

    addIncome = event => {
        event.preventDefault();
        let { date, company, check_amount, check_number } = this.state;
        let formatedDate = moment(date).format('MM DD YYYY').split(' ');
        let month = +formatedDate[0];
        let day = +formatedDate[1];
        let year = +formatedDate[2];
        axios.post('/api/income', { company, check_amount, check_number, month, day, year })
            .then(() => this.props.history.goBack())
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="component-income-add">
                <Modal classNames={{ modal: 'custom-modal' }} open={this.state.open} onClose={this.onCloseModal} center>
                    <h2>Add Company</h2>
                    <div className="edit-driver-form">
                        <div className="form-group">
                            <h6 className="driver">Company</h6>
                            <input name='companyModal' onChange={this.onInputChange} className="form-control" type="text" />
                        </div>
                        <div className="edit-form-buttons">
                            <button onClick={() => this.addCompany()} type='submit' className="btn btn-primary">Add</button>
                        </div>
                    </div>
                </Modal>
                <div className="form">
                    <div className="form-header">
                        <h5>Add Income</h5>
                    </div>
                    <div className="form-group">
                        <label>
                            Date
                        </label>
                        <DatePicker
                            className="form-control"
                            selected={this.state.date}
                            onChange={this.onDateChange}
                        />
                    </div>
                    <div className="form-group">
                        <label className="company">
                            Company
                            <button onClick={this.onOpenModal} className="btn-empty"><i className="fa fa-plus-circle"></i></button>
                        </label>
                        <select onChange={this.onCompanyChange} className="form-control">
                            {this.state.companies.map(company => {
                                return (
                                    <option key={company.company_id} value={company.company_name}>{company.company_name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Amount</label>
                        <input value={this.state.check_amount} name='check_amount' onChange={this.onInputChange} className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                        <label>Check#</label>
                        <input value={this.state.check_number} name='check_number' onChange={this.onInputChange} className="form-control" type="text" />
                    </div>
                    <div className="form-submit">
                        <button onClick={this.addIncome} type='submit' className="btn btn-secondary">Add</button>
                        <button onClick={() => this.props.history.push('/dashboard/income')} className="btn btn-secondary">Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard_Income_Add;