import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
    render() {
        return (
            <div className="component-home">
                <header className="header">
                    <nav className="header-nav">
                        <div className="header-nav-logo">
                            <span>Logo</span>
                        </div>
                        <div className="header-nav-links">
                            <a className="link" href="#features">Features</a>
                            <a className="link" href="#pricing">Pricing</a>
                            <a className="link" href="#contact">Contact</a>
                        </div>
                        <div className="header-nav-login">
                            <button className="btn btn-login">Login</button>
                        </div>
                    </nav>
                    <div className="header-hero">
                        <h1>Trucking Manager</h1>
                        <h3>Take your trucking business to the next level</h3>
                        <div classNamet>

                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

export default Home;