import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addLoad} from '../../../../ducks/reducer';

class Step1 extends Component {
    constructor(){
        super();
        this.state = {
            shipper: '',
            pickupAddr: '',
            destAddr: '',
            rate: '',
            date: ''
        }
    }

    componentDidMount(){
        let {shipper, pickupAddr, destAddr,  rate, date} = this.props;
        this.setState({shipper, pickupAddr, destAddr,  rate, date});
    }

    onInputChange = event => this.setState({[event.target.name]:event.target.value})

    addLoad = event =>{
        event.preventDefault();
        let{shipper, pickupAddr, destAddr,  rate, date} = this.state;
        this.props.addLoad({
            shipper, pickupAddr, destAddr, rate, date
        })
        this.props.history.push(`${this.props.match.url}/drivers`)
    }

    render() {
        return (
            <div className="component-load-form">
                <h5>Dispatch Information</h5>
                <form onSubmit={event => this.addLoad(event)}>
                    <div className="form-group">
                        <label>Shipper</label>
                        <input value={this.state.shipper} name='shipper' onChange={this.onInputChange} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Pickup Address</label>
                        <input value={this.state.pickupAddr} name='pickupAddr' onChange={this.onInputChange} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Destination Address</label>
                        <input value={this.state.destAddr} name='destAddr' onChange={this.onInputChange} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Rate</label>
                        <input value={this.state.rate} name='rate' onChange={this.onInputChange} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <input  value={this.state.date} name='date' onChange={this.onInputChange} type="date" className="form-control" />
                    </div>
                    <div className="form-controls">
                        <button type='submit'  className="btn btn-primary">Next</button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state){
    let {shipper, pickupAddr, destAddr, rate, date} = state;
    return{
        shipper, pickupAddr, destAddr,  rate, date
    }
}

export default connect(mapStateToProps, {addLoad})(Step1);