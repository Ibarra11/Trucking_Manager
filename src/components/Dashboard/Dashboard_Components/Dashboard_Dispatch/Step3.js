import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Step3 extends Component {

    sendDispatch = () =>{
        axios.post('/api/driver/numbers', this.props.driversList)
        .then(res =>{
            console.log(res)
        })
        // let body = `\nShipper:${this.props.shipper}\nPickup Address: ${this.props.pickupAddr}\nDestination Address: ${this.props.destAddr}\nrate: ${this.props.rate}`
        // axios.post('/api/dispatch', {
        //     body: body
        // })
        // .then(() =>{
        //     alert('test');
        // })
    }

    render() {
        return (
            <div className="component-confirmation">
                <div className="card">
                    <div className="card-body">
                        <h5>Confirm Dispatch</h5>
                        <div className="card-field">
                            <p>Shipper: {this.props.shipper}</p>
                        </div>
                        <div className="card-field">
                            <p>Pickup Address: {this.props.pickupAddr}</p>
                        </div>
                        <div className="card-field">
                            <p>Destination Address: {this.props.destAddr}</p>
                        </div>
                        <div className="card-field">
                            <p>Rate per Ton: {this.props.rate}</p>
                        </div>
                        <div className="card-field">
                            <p>Drivers:</p>
                            <ul className="driver-list">
                                {this.props.driversList.map((driver, index) => {
                                    return <li className="driver-item"  key={index}>{driver}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="controls">
                    <button onClick={() => this.props.history.goBack()} className="btn">Previous</button>
                    <button onClick={this.sendDispatch} className="btn">Send Dispatch</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { drivers, shipper, pickupAddr, destAddr, rate } = state;
    return {
        driversList: drivers, shipper, pickupAddr, destAddr, rate
    }
}

export default connect(mapStateToProps)(Step3)