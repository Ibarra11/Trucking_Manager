import React, { Component } from 'react';
import './register.css';
class Register extends Component {
    render() {
        return (
            <div className="component-register">
                <nav className="nav">
                    <div className="nav-logo">
                        <h2>Trucking Manager</h2>
                    </div>
                    <div className="nav-home">
                        <button onClick={() => this.props.history.goBack()}>Back</button>
                    </div>
                </nav>
                <form className="register-form">
                    <div className="form-header">
                        <h1>Join Trucking Manager</h1>
                    </div>
                    <div className="form-group">
                        <h6>Account Type</h6>
                        <select className="form-control" name="" id="">
                            <option value="premium">Premium</option>
                            <option value="Pro">Pro</option>
                            <option value="basic">Basic</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <h6>First Name</h6>
                        <input className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                        <h6>Last Name</h6>
                        <input className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                        <h6>Email</h6>
                        <input className="form-control" type="email" />
                    </div>
                    <div className="form-button">
                        <button className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Register;