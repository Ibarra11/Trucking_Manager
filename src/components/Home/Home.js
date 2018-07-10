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
                            <button onClick={() => this.props.history.push('/login')} className="btn btn-login">Login</button>
                        </div>
                    </nav>
                    <div className="header-hero">
                        <h1>Trucking Manager</h1>
                        <h3>Take your trucking business to the next level</h3>
                    </div>
                </header>
                {/* Start of Features Section */}
                <section className="section features">
                    <div className="section-heading">
                        <h2 className="section-heading-primary">Features</h2>
                        <p className="section-heading-secondary">Lorem ipsum dolor sit amet.</p>
                    </div>
                    <div className="section-content">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-3 feature-container">
                                    <i className="fa fa-dollar"></i>
                                    <h4 className="feature-heading-primary">Payroll</h4>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum odio voluptatem quam optio suscipit non.</p>
                                </div>
                                <div className="col-sm-3 feature-container">
                                    <i className="fa fa-dollar"></i>
                                    <h4 className="feature-heading-primary">IFTA Support</h4>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum odio voluptatem quam optio suscipit non.</p>
                                </div>
                                <div className="col-sm-3 feature-container">
                                    <i className="fa fa-dollar"></i>
                                    <h4 className="feature-heading-primary">Dispatch</h4>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum odio voluptatem quam optio suscipit non.</p>
                                </div>
                                <div className="col-sm-3 feature-container">
                                    <i className="fa fa-dollar"></i>
                                    <h4 className="feature-heading-primary">Fuel Log</h4>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum odio voluptatem quam optio suscipit non.</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-3 feature-container">
                                    <i className="fa fa-dollar"></i>
                                    <h4 className="feature-heading-primary">Expense Records</h4>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum odio voluptatem quam optio suscipit non.</p>
                                </div>
                                <div className="col-sm-3 feature-container">
                                    <i className="fa fa-dollar"></i>
                                    <h4 className="feature-heading-primary">Truck Navigation</h4>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum odio voluptatem quam optio suscipit non.</p>
                                </div>
                                <div className="col-sm-3 feature-container">
                                    <i className="fa fa-dollar"></i>
                                    <h4 className="feature-heading-primary">Alert System</h4>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum odio voluptatem quam optio suscipit non.</p>
                                </div>
                                <div className="col-sm-3 feature-container">
                                    <i className="fa fa-dollar"></i>
                                    <h4 className="feature-heading-primary">1099 Tax Automation</h4>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum odio voluptatem quam optio suscipit non.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section pricing">
                    <div className="section-heading">
                        <h2 className="section-heading-primary">Pricing</h2>
                        <p className="section-heading-secondary">Lorem ipsum dolor sit amet.</p>
                    </div>
                    <div className="section-content">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="card">
                                        <div className="card-heading">
                                            <h3 className="card-heading-primary">Premium</h3>
                                            <p className="card-heading-secondary">$39.99</p>
                                        </div>
                                        <div className="card-body">
                                            <ul className="feature-list">
                                            <li>Payroll</li>
                                            <li>Fuel Tracker</li>
                                            <li>Navigation</li>
                                            <li>IFTA</li>
                                            <li>Expense Reports</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                <div className="card">
                                        <div className="card-heading">
                                            <h3 className="card-heading-primary">Premium</h3>
                                            <p className="card-heading-secondary">$39.99</p>
                                        </div>
                                        <div className="card-body">
                                            <ul className="feature-list">
                                            <li>Payroll</li>
                                            <li>Fuel Tracker</li>
                                            <li>Navigation</li>
                                            <li>IFTA</li>
                                            <li>Expense Reports</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                <div className="card">
                                        <div className="card-heading">
                                            <h3 className="card-heading-primary">Premium</h3>
                                            <p className="card-heading-secondary">$39.99</p>
                                        </div>
                                        <div className="card-body">
                                            <ul className="feature-list">
                                            <li>Payroll</li>
                                            <li>Fuel Tracker</li>
                                            <li>Navigation</li>
                                            <li>IFTA</li>
                                            <li>Expense Reports</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Home;