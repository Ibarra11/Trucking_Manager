import React, { Component } from 'react';

class Dashboard_Trucks_Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unit: '',
            year: '',
            make: '',
            plate_number: '',
            model: '',
            vin: '',
            driver_id: ''
        }
    }

    onInputChange = event => this.setState({[event.target.name]: event.target.value})

    addTruck = event =>{
        event.preventDefault();
    }
    
    render() {
        return (
            <div className="component-truck-add">
                <form className="truck-form">
                    <div className="container">
                        <div className="row">
                            <div className="form-group col-md-6">
                                <h6>Unit Number</h6>
                                <input name='unit' className="form-control" type="text" />
                            </div>
                            <div className="form-group col-md-6">
                                <h6>Year</h6>
                                <input name='year' className="form-control" type="text" />
                            </div>
                            <div className="form-group col-md-6">
                                <h6>Make</h6>
                                <input name='make' className="form-control" type="text" />
                            </div>
                            <div className="form-group col-md-6">
                                <h6>Plate Number</h6>
                                <input name='plate_number' className="form-control" type="text" />
                            </div>
                            <div className="form-group col-md-6">
                                <h6>VIN</h6>
                                <input name='vin' className="form-control" type="text" />
                            </div>
                            <div className="form-group col-md-6">
                                <h6>Driver Id</h6>
                                <input name='driver_id' className="form-control" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="truck-add-buttons">
                        <button className="btn btn-primary">Save Truck</button>
                        <button className="btn btn-danger">Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Dashboard_Trucks_Add;