import React, { Component } from 'react';
import axios from 'axios';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountType: 'premium',
            username: '',
            email: '',
            password: '',
            password2: '',
            errors: []
        }
    }
    onChangeInput = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onChangeSelect = event => {
        this.setState({ accountType: event.target.value })
    }
    registerUser = event => {
        event.preventDefault();
        let { accountType, username, password, password2,  email } = this.state
        axios.post('/api/auth/register', { accountType, username, password, password2, email })
            .then((res) => {
                if (res.data === 'OK') {
                    this.props.history.push('/dashboard')
                }
                else {
                    this.setState({ errors: res.data })
                }
            })
            .catch(err => console.log(err))
    }

    renderErrors = () => {
        return this.state.errors.map((e, i) => {
            return (
                <div key={i} className="alert alert-danger">
                    {e.msg}
                </div>
            )
        })
    }
    render() {
        return (
            <div className="component-register">
                <nav className="nav">
                    <div className="nav-logo">
                        <h2>Trucking Manager</h2>
                    </div>
                    <div className="nav-home">
                        <button className="btn home" onClick={() => this.props.history.goBack()}>Home</button>
                    </div>
                </nav>
                <form onSubmit={this.registerUser} className="register-form">
                    <div className="form-header">
                        <h1>Join Trucking Manager</h1>
                    </div>
                    <div className="form-group">
                        <h6>Account Type</h6>
                        <select onChange={this.onChangeSelect} className="form-control" name="" id="">
                            <option value="premium">Premium</option>
                            <option value="Pro">Pro</option>
                            <option value="basic">Basic</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <h6>Username</h6>
                        <input name='username' value={this.state.username} onChange={this.onChangeInput} className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                        <h6>Password</h6>
                        <input name='password' value={this.state.password} onChange={this.onChangeInput} className="form-control" type="password" />
                    </div>
                    <div className="form-group">
                        <h6>Re-Enter Password</h6>
                        <input name='password2' value={this.state.password2} onChange={this.onChangeInput} className="form-control" type="password" />
                    </div>

                    <div className="form-group">
                        <h6>Email</h6>
                        <input name='email' value={this.state.email} onChange={this.onChangeInput} className="form-control" type="email" />
                    </div>
                    <div className="form-button">
                        <button className="btn btn-primary">Register</button>
                    </div>
                </form>
                <div className="errors">
                    {this.state.errors[0] ? this.renderErrors() : ''}
                </div>
            </div>
        )
    }
}

export default Register;