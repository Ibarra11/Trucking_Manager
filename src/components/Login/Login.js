import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    onChangeInput = event => this.setState({[event.target.name]: event.target.value})

    render(){
        return(
            <div>
                Login
            </div>
        )
    }
}

export default Login;