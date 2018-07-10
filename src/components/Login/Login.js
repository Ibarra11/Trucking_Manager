import React, { Component } from 'react';
import './Login.css';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    onChangeInput = event => this.setState({ [event.target.name]: event.target.value });

    findUser = event => {
        event.preventDefault();
        let { username, password } = this.state;
        axios.post('/api/auth/login', { username, password })
            .then(res => this.props.history.push('/dashboard'))
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div className="component-login">
                <form onSubmit={this.findUser}>
                    <div className="form-group">
                        <h6>Username</h6>
                        <input className='form-control' name='username' onChange={this.onChangeInput} value={this.state.username} type="text" />
                    </div>
                    <div className="form-group">
                        <h6>Password</h6>
                        <input className='form-control' name='password' onChange={this.onChangeInput} value={this.state.password} type="password" />
                    </div>
                    <div className="form-login">
                        <button className="btn">Log In</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;