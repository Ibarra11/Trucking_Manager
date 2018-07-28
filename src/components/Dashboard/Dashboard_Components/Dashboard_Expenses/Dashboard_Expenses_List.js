import React, { Component } from 'react';
import axios from 'axios';
class Dashboard_Expenses_List extends Component {
    constructor() {
        super();
        this.state = {
            expenses: []
        }
    }
    componentDidMount() {
        axios.get('/api/expenses')
            .then(res => this.setState({ expenses: res.data }))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="component-expense-list">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Truck</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.expenses.map(expense => {
                            return (
                                <tr key={expense.id}>
                                    <td><span>{expense.date}</span></td>
                                    <td><span>{expense.category}</span></td>
                                    <td><span>{expense.truck}</span></td>
                                    <td><span>{expense.amount}</span></td>
                                    <td className="table-buttons">
                                        <span>
                                            <button className="btn btn-primary"><i className="fa fa-edit"></i></button>
                                            <button className="btn btn-danger"><i className="fa fa-trash"></i></button>
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="table-controls">
                    <button onClick={() => this.props.history.push('/dashboard/expenses/add')} className="btn"><i className="fa fa-plus"></i> Expense</button>
                </div>
            </div>
        )
    }
}

export default Dashboard_Expenses_List;