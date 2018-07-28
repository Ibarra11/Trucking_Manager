import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert2';

class Step3 extends Component {

    sendDispatch = async () => {
        let body = `\nShipper:${this.props.shipper}\nPickup Address: ${this.props.pickupAddr}\nDestination Address: ${this.props.destAddr}\nrate: ${this.props.rate}`;

        for (let i = 0; i < this.props.driversList.length; i++) {
            await axios.post('/api/dispatch', {
                body: body,
                number: '1' + this.props.driversList[i].contactNumber
            })
            swal({
                position: 'top-end',
                type: 'success',
                title: 'Dispatch Successfully Sent',
                showConfirmButton: false,
                timer: 2500
            })
            setTimeout(() => this.props.history.push('/dashboard/dispatch'), 2700);
        }
    }

    render() {
        console.log(this.props);
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
                                    return <li className="driver-item" key={index}>{driver.driver}</li>
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