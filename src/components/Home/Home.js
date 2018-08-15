import React, { Component } from 'react';
import analytics from './images/analytics.PNG';
import dispatch from './images/dispatch.PNG';
import records from './images/recordManagement.PNG';
class Home extends Component {
    render() {
        return (
            <div className="component-home">
                <header className="header">
                    <nav className="header-nav">
                        <h2>Trucking Manager</h2>
                        <div className="header-nav-links">
                            <a className="link" href="#features">Features</a>
                            <a className="link" href="#pricing">Pricing</a>
                            <a className="link" href="#contact">Contact</a>
                            <button className=" btn" onClick={() => this.props.history.push('/login')} >Login</button>
                        </div>
                        {/* <div className="header-nav-login">
                          
                        </div> */}
                    </nav>
                    <div className="header-hero">
                        <h1>Trucking Manager</h1>
                        <h3>A Management System Built For Truckers</h3>
                        <div className="hero-button">
                            <button className="btn ">Get Started Today</button>
                        </div>
                    </div>
                </header>
                {/* Start of Features Section */}
                <section className="section features">
                    <div className="section-heading">
                        <h2 className="section-heading-primary">Features</h2>
                        <p className="section-heading-secondary">Run Your Business in a More Efficient and Organized Manner</p>
                    </div>
                    <div className="section-content">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="feature-container">
                                        <h3>Record Management</h3>
                                        <p>
                                            Running a trucking business is very time consuming and
                                            requires alot of record keeping.  With our software we
                                            can keep track of your records for you.  It's hassle free and
                                            very easy to use, we do all the hard work for you.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="feature-img">
                                        <img src={records} alt=" Image" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="feature-img">
                                        <img src={analytics} alt=" analytics Image" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="feature-container">
                                        <h3>Analytics</h3>
                                        <p>
                                            We provide analytics for services like
                                            revenue, payroll, and expenses. This will make
                                            you much more efficient at evaluating the flow
                                            of money throughout your company.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="feature-container">
                                        <h3>Dispatch System</h3>
                                        <p>
                                            Sending jobs to drivers has never been easier.
                                            Our dispatch system enables you to send jobs to multiple
                                            drivers with a single click of a button.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="feature-img">
                                        <img src={dispatch} alt="Dispatch Image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section pricing">
                    <div className="section-heading">
                        <h2 className="section-heading-primary">Pricing</h2>
                        <p className="section-heading-secondary">Pick a Plan and Elevate Your Trucking Business </p>
                    </div>
                    <div className="section-content">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="card">
                                        <div className="card-heading">
                                            <h3 className="card-heading-primary">Premium</h3>
                                            <p className="card-heading-secondary"><span className="big">$39.99</span>/Month</p>
                                        </div>
                                        <div className="cards">
                                            <ul className="feature-list">
                                                <div className="feature">
                                                    <li >Payroll</li>
                                                    <i className="fa fa-check"></i>
                                                </div>
                                                <div className="feature">
                                                    <li >Dispatch</li>
                                                    <i className="fa fa-check"></i>
                                                </div>
                                                <div className="feature">
                                                    <li >Income Management</li>
                                                    <i className="fa fa-check"></i>
                                                </div>
                                                <div className="feature">
                                                    <li >Expense Management</li>
                                                    <i className="fa fa-check"></i>
                                                </div>
                                                <div className="feature">
                                                    <li >IFTA Support</li>
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </ul>
                                        </div>
                                        <div className="card-register">
                                            <button className="btn btn-register" onClick={() => this.props.history.push('/register')}>Purchase</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="card">
                                        <div className="card-heading">
                                            <h3 className="card-heading-primary">Pro</h3>
                                            <p className="card-heading-secondary"><span className="big">$19.99</span>/Month</p>
                                        </div>
                                        <div className="cards">
                                            <ul className="feature-list">
                                                <div className="feature">
                                                    <li >Payroll</li>
                                                    <i className="fa fa-check"></i>
                                                </div>
                                                <div className="feature">
                                                    <li >Dispatch</li>
                                                    <i className="fa fa-times"></i>
                                                </div>
                                                <div className="feature">
                                                    <li >Income Management</li>
                                                    <i className="fa fa-check"></i>
                                                </div>
                                                <div className="feature">
                                                    <li >Expense Management</li>
                                                    <i className="fa fa-check"></i>
                                                </div>
                                                <div className="feature">
                                                    <li >IFTA Support</li>
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </ul>
                                        </div>
                                        <div className="card-register">
                                            <button className="btn btn-register" onClick={() => this.props.history.push('/register')}>Purchase</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="card">
                                        <div className="card-heading">
                                            <h3 className="card-heading-primary">Basic</h3>
                                            <p className="card-heading-secondary"><span className="big">$0.00</span>/Month</p>
                                        </div>
                                        <div className="cards">
                                            <ul className="feature-list">
                                                <div className="feature">
                                                    <li >Payroll</li>
                                                    <i className="fa fa-check"></i>
                                                </div>
                                                <div className="feature">
                                                    <li >Dispatch</li>
                                                    <i className="fa fa-times"></i>
                                                </div>
                                                <div className="feature">
                                                    <li >Income Management</li>
                                                    <i className="fa fa-check"></i>
                                                </div>
                                                <div className="feature">
                                                    <li >Expense Management</li>
                                                    <i className="fa fa-check"></i>
                                                </div>
                                                <div className="feature">
                                                    <li >IFTA Support</li>
                                                    <i className="fa fa-times"></i>
                                                </div>
                                            </ul>
                                        </div>
                                        <div className="card-register">
                                            <button className="btn btn-register" onClick={() => this.props.history.push('/register')}>Purchase</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section section-contact">
                    <div className="section-heading">
                        <h2 className="section-heading-primary">Contact</h2>
                        <p className="section-heading-secondary">Have any questions. Ask Us!</p>
                    </div>
                    <div className="section-content">
                        <form>
                            <div className="form-group">
                                <label htmlFor="">Name</label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Name</label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Email</label>
                                <input className="form-control" type="email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Message</label>
                                <textarea className="form-control" rows="4"></textarea>
                            </div>
                            <div className="form-submit">
                                <button className="btn">Send Message <i className="fa fa-send"></i></button>
                            </div>

                        </form>
                    </div>
                </section>
                <footer>
                    <p>Trucking Manager &copy; 2018</p>
                </footer>
            </div>
        )
    }
}

export default Home;