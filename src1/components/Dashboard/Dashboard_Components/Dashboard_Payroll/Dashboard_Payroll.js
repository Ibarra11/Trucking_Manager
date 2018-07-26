import React, { Component } from 'react';
import Dashboard_Payroll_Cards from './Dashboard_Payroll_Cards';
import Dashboard_Payroll_Table from './Dashboard_Payroll_Table';
import Dashboard_Payroll_Chart from './Dashboard_Payroll_Chart';
class Dashboard_Payroll extends Component {
    render() {
        return (
            <div className="component-payroll">
                <div className="payroll-dashboard">
                    <h3>Payroll</h3>
                </div>
                <div className="container">
                    <div className="row payroll-container">
                        <div className="col-md-3">
                            <Dashboard_Payroll_Cards />
                        </div>
                        <div className="col-md-9">
                            <Dashboard_Payroll_Chart />
                            <Dashboard_Payroll_Table />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Dashboard_Payroll;