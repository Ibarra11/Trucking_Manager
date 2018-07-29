import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Dashboard_Contacts_Add from './Dashboard_Contacts_Add';
import Dashboard_Contacts_Table from './Dashboard_Contacts_Table';
class Dashboard_Contacts extends Component {
    render() {
        return (
            <div className="component-contacts">
                <div className="card">
                    <div className="card-header">
                        <h3>Contacts</h3>
                    </div>
                </div>
                <div className="component-contacts-views">
                    <Switch>
                            <Route path='/dashboard/contacts/add' component={Dashboard_Contacts_Add} />
                            <Route component={Dashboard_Contacts_Table} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default Dashboard_Contacts;