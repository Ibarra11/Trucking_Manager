import React, {Component} from 'react';
import Dashboard_Income_Monthly from './Dashboard_Income_Monthly';
import Dashboard_Income_Company from './Dashboard_Income_Company';
class Dashbaord_Income_Metrics extends Component {
    render() {
        return (
            <div className="income-view">
                    <div className="card-body">
                        <div className="stats">
                            <div className="total-income">
                                <h6>Total Income</h6>
                                <p>$20,345</p>
                            </div>
                            <div className="total-income">
                                <h6>Avg Income/Month</h6>
                                <p>$20,345</p>
                            </div>
                        </div>
                        <div className="graphs">
                            <div className="income-monthly">
                                <h5>Income Per Month</h5>
                                <Dashboard_Income_Monthly />
                            </div>
                            <div className="income-monthly">
                                <h5>Income Per Company</h5>
                                <Dashboard_Income_Company />
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Dashbaord_Income_Metrics;