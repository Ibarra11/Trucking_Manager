import React, { Component } from 'react';

class Step1 extends Component {
    render() {
        return (
            <div className="component-load-form">
                <h5>Load Information</h5>
                <form>
                    <div className="form-group">
                        <label>Shipper</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Pickup Address</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Destination Address</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Load Description</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Rate</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-controls">
                        <button  className="btn btn-primary">Next</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Step1;