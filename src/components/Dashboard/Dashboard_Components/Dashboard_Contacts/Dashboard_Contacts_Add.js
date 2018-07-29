import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Dashboard_Contacts_Add extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            companyName: '',
            phone: '',
            email: '',
            address: ''
        }
    }
    addContact = event => {
        event.preventDefault();
        let { name, companyName, phone, email, address } = this.state;
        axios.post('/api/contacts', {
            name, companyName, phone, email, address
        })
            .then(
                this.props.history.goBack()
            )
    }
    onInputChange = event => this.setState({ [event.target.name]: event.target.value });

    render() {
        return (
            <div className="component-contacts-add">
                <h4>Add Contact</h4>
                <form onSubmit={event => this.addContact(event)}>
                    <div className="form-group">
                        <label htmlFor="">Name</label>
                        <input onChange={this.onInputChange} name='name' className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                        <label htmlFor=""> Company Name</label>
                        <input onChange={this.onInputChange} name='companyName' className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Phone</label>
                        <input onChange={this.onInputChange} name='phone' className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input onChange={this.onInputChange} name='email' className="form-control" type="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Address</label>
                        <input onChange={this.onInputChange} name='address' className="form-control" type="text" />
                    </div>
                    <div className="submit">
                        <button type='submit' className="btn btn-primary">Add Contact</button>
                        <Link to='/dashboard/contacts'><button className="btn btn-danger">Cancel</button></Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default Dashboard_Contacts_Add;