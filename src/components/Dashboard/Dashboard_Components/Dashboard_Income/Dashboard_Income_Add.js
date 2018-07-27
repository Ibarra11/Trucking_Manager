import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import axios from 'axios';
class Dashboard_Income_Add extends Component {
    constructor() {
        super();
        this.state = {
            company: '',
            companyModal: '',
            companies: [],
            open: false,
            date: '',
            amount: 0,
            check: ''
        }
    }

    componentDidMount() {
        axios.get('/api/income/company')
            .then(res => this.setState({ companies: res.data, company: res.data[0].name }))
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

    onCompanyChange = event => this.setState({company: event.target.value});

    onInputChange = event => this.setState({ [event.target.name]: event.target.value });

    addCompany = event => {
        event.preventDefault();
        axios.post('/api/income/company', {
            company: this.state.companyModal
        })
            .then(() => {
                this.onCloseModal();
            })
    }

    addIncome = event => {
        event.preventDefault();
        let { date, company, amount, check } = this.state;
        axios.post('/api/income', {date, company, amount, check})
        .then(() => this.props.history.goBack())
    }

    render() {
        return (
            <div className="component-income-add">
                <Modal classNames={{ modal: 'custom-modal' }} open={this.state.open} onClose={this.onCloseModal} center>
                    <h2>Add Company</h2>
                    <form onSubmit={event => this.addCompany(event)} className="edit-driver-form">
                        <div className="form-group">
                            <h6 className="driver">Company</h6>
                            <input name='companyModal' onChange={this.onInputChange} className="form-control" type="text" />
                        </div>
                        <div className="edit-form-buttons">
                            <button type='submit' className="btn btn-primary">Add</button>
                        </div>
                    </form>
                </Modal>
                <div className="card">
                    <div className="card-header">
                        <h3>Add Income</h3>
                    </div>
                </div>
                <form onSubmit={event => this.addIncome(event)}>
                    <div className="form-group">
                        <label>
                            Date
                        </label>
                        <input name='date' onChange={this.onInputChange} className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                        <label className="company">
                            Company
                            <button onClick={this.onOpenModal} className="btn-empty"><i className="fa fa-plus-circle"></i></button>
                        </label>
                        <select onChange={this.onCompanyChange} className="form-control">
                            {this.state.companies.map(company => {
                                return (
                                    <option value={company.name}>{company.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Amount</label>
                        <input name='amount' onChange={this.onInputChange} className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                        <label>Check#</label>
                        <input name='check' onChange={this.onInputChange} className="form-control" type="text" />
                    </div>
                    <div className="form-submit">
                        <button type='submit' className="btn btn-primary">Add Income</button>
                        <Link to='/dashboard/income'><button className="btn btn-danger">Cancel</button></Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default Dashboard_Income_Add;