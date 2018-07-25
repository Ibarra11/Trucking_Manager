import React, { Component } from 'react';
import { Switch, Route, Link, NavLink } from 'react-router-dom';
import Form_Load from './Form_Load';
import Form_Drivers from './Form_Drivers';
class Create_Dispatch extends Component {
    render() {
        return (
            <div className="component-dispatch-create">
                <h3>Dispatch | Load Information</h3>
                <form className="dispatch-form">
                    <div className="form-shipper">
                    
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="">Shipper Business Name</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="">Shipper Address</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="">Pickup Date</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="">Pickup Time</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="">Rate/Ton</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="">Load Description</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-sm-10">
                                    <div className="form-group">
                                        <label htmlFor="">Extra Details</label>
                                        <textarea className="form-control"></textarea>
                                    </div>
                                </div>
                            </div>
                            <Link to='/dashboard/dispatch/dropoff'><button className="btn btn-primary">Next</button></Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Create_Dispatch;