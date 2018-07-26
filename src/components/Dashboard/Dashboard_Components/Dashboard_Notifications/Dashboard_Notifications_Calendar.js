import React, { Component } from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
Calendar.setLocalizer(Calendar.momentLocalizer(moment))

class Dashboard_Notifications_Calendar extends Component {
    constructor() {
        super();
        this.state = {
            events: [
                {
                    start: new Date(),
                    end: new Date(moment().add(1, "days")),
                    title: 'Some Title'
                }
            ]
        }
    }
    render() {
        return (
            <div className="component-calendar">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <Calendar
                                defaultDate={new Date()}
                                defaultView="month"
                                events={this.state.events}
                                style={{ height: "100vh" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard_Notifications_Calendar;