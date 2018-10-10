import React, { Component } from 'react';
import axios from 'axios';

const API_KEY = 'b6907d289e10d714a6e88b30761fae22';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast?';

class Dashboard_Weather extends Component {
    constructor() {
        super();
        this.state = {
            weather: [],
            days: [],
            weatherCity: ''
        }
    }


    getWeather = () => {
        let dates = [];
        let days = [];
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.weatherCity},us&units=imperial&appid=9ea355ccdeec6f6dd8b4406d7a233346`)
            .then(res => {
                res.data.list.forEach(date => {
                    if (!days.includes(date.dt_txt.substring(0, 10))) {
                        days.push(date.dt_txt.substring(0, 10))
                        dates.push(date);
                    }
                })
                this.setState({ weather: dates, days: days })
            })
            .catch(err => console.log(err))
    }

    onInputChange = event => this.setState({ [event.target.name]: event.target.value });

    render() {
        return (
            <div className="component-weather">
                <div className="weather-header">
                    <h5>Weather Center</h5>
                </div>
                <div className="component-weather-view">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 weather-controls">
                                <label htmlFor="">5 day weather broadcast</label>
                                <input onChange={this.onInputChange} name="weatherCity" value={this.state.weatherCity} placeholder="Get weather by city" type="text" className="form-control" />
                                <div className="weather-button">
                                    <button onClick={this.getWeather} className="btn btn-primary">Get Weather</button>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="container">
                                    <div className="row">
                                        {this.state.weather.map((date, index) => {
                                            let imageId = date.weather[0].icon;
                                            let temp = date.main.temp;
                                            let day = new Date(this.state.days[index]).toString().substring(0, 3);
                                            return (
                                                <div key={index} className="col-md-4 card">
                                                    <h5>{day}</h5>
                                                    <img src={`http://openweathermap.org/img/w/${imageId}.png`} alt="" />
                                                    <p>{temp}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard_Weather;