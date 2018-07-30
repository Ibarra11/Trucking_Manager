import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
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
        }
    }
    onInputChange = event => this.setState({[event.target.name]: event.target.value})
    addTruck = event =>{
        event.preventDefault();
        let {unit, make, model, year, plate_number, vin} = this.state;
        axios.post('/api/truck', {
            unit, make, model, year, plate_number, vin
        })
        .then(() =>{
            this.props.history.goBack();
        })
    }
    render() {
        return (
            <div className="component-truck-add">
            <h4>Add Truck</h4>
                <form onSubmit={event => this.addTruck(event)} className="truck-form">
                    <div className="container">
                        <div className="row">
                            <div className="form-group col-md-6">
                                <h6>Unit Number</h6>
                                <input onChange={this.onInputChange} name='unit' className="form-control" type="text" />
                            </div>
                            <div className="form-group col-md-6">
                                <h6>Make</h6>
                                <input onChange={this.onInputChange} name='make' className="form-control" type="text" />
                            </div>
                            <div className="form-group col-md-6">
                                <h6>Model</h6>
                                <input onChange={this.onInputChange} name='model' className="form-control" type="text" />
                            </div>
                            <div className="form-group col-md-6">
                                <h6>Year</h6>
                                <input onChange={this.onInputChange} name='year' className="form-control" type="text" />
                            </div>
                            <div className="form-group col-md-6">
                                <h6>Plate#</h6>
                                <input onChange={this.onInputChange} name='plate_number' className="form-control" type="text" />
                            </div>
                            <div className="form-group col-md-6">
                                <h6>VIN</h6>
                                <input onChange={this.onInputChange} name='vin' className="form-control" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="truck-add-buttons">
                       <button type='submit' className="btn btn-primary">Add Truck</button>
                       <Link to='/dashboard/trucks'><button className="btn btn-danger">Cancel</button></Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default Dashboard_Trucks_Add;