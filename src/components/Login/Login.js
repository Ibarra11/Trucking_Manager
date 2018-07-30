import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            error: ''
        }
    }

    onChangeInput = event => this.setState({ [event.target.name]: event.target.value });

    findUser = event => {
        event.preventDefault();
        let { username, password } = this.state;
        axios.post('/api/auth/login', { username, password })
            .then(res => {
                if (res.data === 'valid') {
                    this.props.history.push('/dashboard')
                }
                else {
                    this.setState({ error: 'Username and password did not match' })
                }
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div className="component-login">
                <nav className="nav">
                    <div className="nav-logo">
                        <h2>Trucking Manager</h2>
                    </div>
                    <div className="nav-home">
                        <button className="btn home" onClick={() => this.props.history.goBack()}>Home</button>
                    </div>
                </nav>
                <form className="form-login" onSubmit={this.findUser}>
                    <h1>Welcome To Trucking Manager</h1>
                    <div className="form-group">
                        <h6>Username</h6>
                        <input className='form-control' name='username' onChange={this.onChangeInput} value={this.state.username} type="text" />
                    </div>
                    <div className="form-group">
                        <h6>Password</h6>
                        <input required className='form-control' name='password' onChange={this.onChangeInput} value={this.state.password} type="password" />
                    </div>
                    <div className="form-login-btn">
                        <button className="btn btn-primary">Log In</button>
                    </div>
                    <Link to='/register'><small>Don't have an account sign up here</small></Link>
                </form>
                {this.state.error ? <p>Username and password did not match</p> : null}
            </div>
        )
    }
}

export default Login;