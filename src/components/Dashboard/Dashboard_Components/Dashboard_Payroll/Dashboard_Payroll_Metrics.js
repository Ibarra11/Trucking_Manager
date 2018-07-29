import React, { Component } from 'react';
import Dashboard_Payroll_Cards from './Dashboard_Payroll_Cards';
import Dashboard_Payroll_Table from './Dashboard_Payroll_Table';
import Dashboard_Payroll_Chart from './Dashboard_Payroll_Chart';
import Dashboard_Payroll_Driver from './Dashboard_Payroll_Driver';
class Dashboard_Payroll_Metrics extends Component {
    render() {
        return (
            <div className="component-payroll">
                <div className="container">
                    <h4 className="payroll-header">Payroll Metrics</h4>
                    <div className="row payroll-container">
                        <div className="col-md-3">
                            <h6>Payroll Overview</h6>
                            <Dashboard_Payroll_Cards />
                        </div>
                        <div className="col-md-9">
                            <div className="chart">
                                <h6>Payroll per Month</h6>
                                <Dashboard_Payroll_Chart />
                            </div>
                            <div className="chart">
                                <h6>Payroll Per Driver</h6>
                                <Dashboard_Payroll_Driver />
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