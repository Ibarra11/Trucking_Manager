import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-responsive-modal';

class Dashboard_Income_List extends Component {
    constructor() {
        super();
        this.state = {
            income: [],
            date: '',
            company: '',
            amount: '',
            check: 0,
            id: 0,
            open: false
        }
    }
    componentDidMount() {
        this.getAllIncome();
    }

    onOpenModal = income => {
        console.log(income);
        this.setState({
            open: true,
            date: income.date,
            company: income.company,
            amount: income.amount,
            check: income.check_number,
            id: income.id
        })
    }

    onCloseModal = () => {
        this.setState({ open: false })
    }

    getAllIncome = () => {
        axios.get('/api/income')
            .then(res => {
                this.setState({ income: res.data })
            })
            .catch(err => console.log(err));
    }

    deleteIncome = incomeId => {
        axios.delete(`/api/income/${incomeId}`)
            .then(() => this.getAllIncome())
            .catch(err => console.log(err))
    }

    updateIncome = event => {
        event.preventDefault();
        let { date,  company, amount, check, id } = this.state;
        axios.put(`/api/income/${id}`, {date,  company, amount, check})
            .then(() =>{
                this.getAllIncome();
                this.onCloseModal();
            })
            .catch(err => console.log(err))
    }

    onInputChange = event => this.setState({[event.target.name]: event.target.value});

    render() {
        return (
            <div className="income-table">
                <div className="card">
                    <div className="card-header">
                        <h4>Income List</h4>
                        <button onClick={() => this.props.history.push('/dashboard/income/add')} className="btn"><i className="fa fa-plus"></i> Income</button>
                    </div>
                    <div className="card-body">
                        <Modal classNames={{ modal: 'custom-modal' }} open={this.state.open} onClose={this.onCloseModal} center>
                            <h2>Edit Income</h2>
                            <form onSubmit={event => this.updateIncome(event)} className="edit-driver-form">
                                <div className="form-group">
                                    <h6 className="driver">Date</h6>
                                    <input name='date' onChange={this.onInputChange} value={this.state.date} className="form-control" type="text" />
                                </div>
                                <div className="form-group">
                                    <h6>Company </h6>
                                    <input onChange={this.onInputChange} name='company' value={this.state.company} className="form-control" type="text" />
                                </div>
                                <div className="form-group">
                                    <h6>Amount</h6>
                                    <input onChange={this.onInputChange} name='amount' value={this.state.amount} className="form-control" type="text" />
                                </div>
                                <div className="form-group">
                                    <h6>Check #</h6>
                                    <input onChange={this.onInputChange} name='check' value={this.state.check} className="form-control" type="text" />
                                </div>
                                <div className="edit-form-buttons">
                                    <button type='submit' className="btn btn-primary">Update</button>
                                </div>
                            </form>
                        </Modal>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Company</th>
                                    <th>Amount</th>
                                    <th>Check #</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.income.map(e => {
                                    return (
                                        <tr key={e.id}>
                                            <td>{e.date}</td>
                                            <td>{e.company}</td>
                                            <td>{e.amount}</td>
                                            <td>{e.check_number}</td>
                                            <td>
                                                <button onClick={() => this.onOpenModal(e)} className="btn btn-primary"><i className="fa fa-edit"></i></button>
                                                <button onClick={() => this.deleteIncome(e.id)} className="btn btn-danger"><i className="fa fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard_Income_List;
