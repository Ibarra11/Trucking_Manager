import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
class Dashboard_Expenses extends Component {
    render() {
        return (
            <div className="component-fuel">
                <div className="fuel-charts">
                </div>
                <div className="fuel-consumption">
                    <div className="fuel-table-header">
                        <h3>Fuel Log</h3>
                        <button className="btn btn-success"><i className="fa fa-plus"></i> Fuel Entry</button>
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Fuel ID</th>
                                <th>Unit</th>
                                <th>Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Dashboard_Expenses;