import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import axios from 'axios';
class Dashboard_Contacts extends Component {
    constructor() {
        super();
        this.state = {
            contacts: [],
            open: false,
            name: '',
            company_name: '',
            phone: '',
            email: '',
            address: '',
            id: ''
        }
    }
    componentDidMount() {
        this.getAllContacts();
    }

    getAllContacts() {
        axios.get('/api/contacts')
            .then(res => this.setState({ contacts: res.data }))
            .catch(err => console.log(err))
    }
    deleteContact = () => {
        // axios.delete('/api/contacts')
        let boxes = document.querySelectorAll('.select input:checked');
        let contactsToDelete = [];
        for (let i = 0; i < boxes.length; i++) {
            contactsToDelete.push(boxes[i].value)
        }
        axios.delete('/api/contacts', contactsToDelete)
            .then(res => this.setState({ contacts: res.data }))
            .catch(err => console.log(err))
    }

    onOpenModal = contactId => {
        let contact = this.state.contacts.filter(contact => contactId === contact.id);
        let { name, company_name, phone, email, address, id } = contact[0];
        this.setState({
            open: true,
            name, company_name, phone, email, address, id
        })
    }

    onCloseModal = () => {
        this.setState({ open: false })
    }

    updateContact = (event) => {
        event.preventDefault();
        let { name, company_name, phone, email, address, id } = this.state;
        axios.put(`/api/contacts/${id}`, {
            name, company_name, phone, email, address 
        })
        .then(() =>{
            this.getAllContacts();
            this.onCloseModal();
        })
    }

    onInputChange = event => this.setState({[event.target.name]: event.target.value});

    render() {
        return (
            <div className="component-contacts">
                <div className="edit-contact">
                    <Modal classNames={{ modal: 'custom-modal' }} open={this.state.open} onClose={this.onCloseModal} center>
                        <h2>Edit Contact</h2>
                        <form onSubmit={event => this.updateContact(event)} className="edit-driver-form">
                            <div className="form-group">
                                <h6 className="driver">Name</h6>
                                <input name='name' onChange={this.onInputChange} value={this.state.name} className="form-control" type="text" />
                            </div>
                            <div className="form-group">
                                <h6>Company Name </h6>
                                <input onChange={this.onInputChange} name='company_name' value={this.state.company_name} className="form-control" type="text" />
                            </div>
                            <div className="form-group">
                                <h6>Phone</h6>
                                <input onChange={this.onInputChange} name='phone' value={this.state.phone} className="form-control" type="text" />
                            </div>
                            <div className="form-group">
                                <h6>Email</h6>
                                <input onChange={this.onInputChange} name='email' value={this.state.email} className="form-control" type="text" />
                            </div>
                            <div className="form-group">
                                <h6>Address</h6>
                                <input onChange={this.onInputChange} name='address' value={this.state.address} className="form-control" type="text" />
                            </div>
                            <div className="edit-form-buttons">
                                <button type='submit' className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </Modal>
                </div>
                <div className="dashboard-header">
                    <h3>Contacts</h3>
                    <div className="header-controls">
                        <Link to='contacts/add'> <button className="btn btn-primary">
                            <i className="fa fa-plus"></i> Contact
                        </button>
                        </Link>
                        <button onClick={this.deleteContact} className="btn btn-danger">
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div className="contacts-main">
                    <table className="table  table-bordered">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Company Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.contacts.map(contact => {
                                return (
                                    <tr key={contact.id}>
                                        <td className="select" ><input value={contact.id} type="checkbox" /></td>
                                        <td>{contact.name}</td>
                                        <td>{contact.company_name}</td>
                                        <td>{contact.phone}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.address}</td>
                                        <td className="actions">
                                            <button onClick={() => this.onOpenModal(contact.id)} className="btn">
                                                <i className="fa fa-edit"></i>
                                            </button>
                                            <button className="btn">
                                                <i className="fa fa-send"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Dashboard_Contacts;