import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addDrivers } from '../../../../ducks/reducer';
import { deleteDriver } from '../../../../ducks/reducer';
class Step2 extends Component {
    constructor() {
        super();
        this.state = {
            drivers: []
        }
    }
    componentDidMount() {
        axios.get('/api/drivers')
            .then(res => {
                    this.setState({ drivers: res.data }) 
            })
            .catch(err => console.log(err))
    }

    addDrivers = () => {
        let drivers = document.querySelectorAll('input[type=checkbox]:checked');
        let driversList = [];
        for (let i = 0; i < drivers.length; i++) {
            console.log(drivers[i])
            driversList.push({driver: drivers[i].defaultValue, contactNumber: drivers[i].dataset.number});
        }
        for (let i = 0; i < drivers.length; i++) {
            drivers[i].checked = false;
        }

        this.props.addDrivers(driversList);
    }

    deleteDriver = driver =>{
        this.props.deleteDriver(driver)
    }

    render() {
        return (
            <div className="component-drivers-info">
                    <h5 className="">Select Drivers</h5>
                    <div className="card drivers">
                        <div className="driver-list">
                            <h6>Driver List</h6>
                            <div className="container-drivers">
                                {this.state.drivers.map(driver => {
                                    console.log(driver);
                                    return (
                                        <div key={driver.driver_id} className="row">
                                            <div className="col-sm-9">
                                                <p> {driver.name}</p>
                                            </div>
                                            <div className="col-sm-3">
                                                <input data-number={driver.contact_number} className="big-checkbox" type="checkbox" value={driver.name} />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="add-driver">
                                <button onClick={this.addDrivers} className="btn btn-primary"><i className="fa fa-plus"> Drivers</i></button>
                            </div>
                        </div>
                        <div className="drivers-added">
                        <h6>Drivers Added</h6>
                            {this.props.addedDrivers.map((driver,i) => {
                                return (
                                    <div key={driver.driver + i} className="driver">
                                       <p> {driver.driver} </p>
                                       <button onClick={() => this.deleteDriver(driver.driver)} className="btn "><i className='fa fa-times-circle'></i></button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="wizard-controls">
                        <button onClick={() => this.props.history.push('/dashboard/dispatch')} className="btn btn-secondary">Previous</button>
                        <button onClick={() => this.props.history.push('/dashboard/dispatch/confirmation')} className="btn btn-secondary">Next</button>
                    </div>
                </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        addedDrivers: state.drivers
    }
}

export default connect(mapStateToProps, { addDrivers, deleteDriver })(Step2);