import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
class Dashboard_Drivers_Add extends Component {
    constructor() {
        super();
        this.state = {
            truckList: [],
            assignedTruck: '',
            name: '',
            dateHired: moment()
        }
    }

    componentDidMount() {
        axios.get('/api/trucks')
            .then(res => this.setState({ truckList: res.data }))
            .catch(err => console.log(err))
    }

    addDriver = event => {
        event.preventDefault();
        let { name, dateHired, assignedTruck } = this.state;
        let formatedDate = moment(dateHired).format('MM DD YYYY').split(' ');
        let monthHired = formatedDate[0];
        let dayHired = formatedDate[1];
        let yearHired = formatedDate[2];
        axios.post('/api/driver', {
            name, dayHired, monthHired, yearHired, unitNumber: assignedTruck
        }).then(() => {
            this.props.history.goBack();
        })
    }

    handleDateChange = dateHired => this.setState({ dateHired });
    
    onInputChange = event => this.setState({ [event.target.name]: event.target.value });
   
    render() {
        return (
            <div className="dashboard-drivers-add">
                <h4 className="drivers-add-h3">Add Driver</h4>
                <form onSubmit={this.addDriver} className="form-drivers-add">
                    <div className="form-group">
                        <h6>Name</h6>
                        <input onChange={this.onInputChange} name='name' className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                        <h6>Date Hired</h6>
                        <DatePicker
                            className="form-control"
                            selected={this.state.dateHired}
                            onChange={this.handleDateChange}
                        />
                    </div>
                    <div className="form-group">
                        <h6>Assigned Truck</h6>
                        <select onChange={this.onInputChange} name='assignedTruck' className="form-control">
                            {this.state.truckList.map(truck => {
                                return <option key={truck.truck_id} value={truck.unit_number}>{truck.unit_number}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-submit">
                        <button type='submit' className="btn btn-secondary">Add</button>
                        <button onClick={() => this.props.history.push('/dashbaord/drivers/add')} className="btn btn-secondary" onClick={this.toggleAddDriver}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Dashboard_Drivers_Add;