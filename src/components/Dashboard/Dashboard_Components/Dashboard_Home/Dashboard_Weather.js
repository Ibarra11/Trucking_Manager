import React, {Component} from 'react';
import axios from 'axios';

const API_KEY = 'b6907d289e10d714a6e88b30761fae22';

class Dashboard_Weather extends Component{
    render(){
        return(
            <div className="component-weather">
                <div className="weather-header">
                    <h5>Weather Center</h5>
                </div>
                <div className="component-weather-view">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 weather-controls">
                                <label htmlFor="">7 day weather broadcast</label>
                                <input placeholder="Get weather by city" type="text" className="form-control"/>
                                <div className="weather-button">
                                    <button className="btn btn-primary">Get Weather</button>
                                </div>
                            </div>
                            <div className="col-md-8">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard_Weather;