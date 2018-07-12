import React from 'react';
import { Switch, Route } from 'react-router-dom';
// Base Routes
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
// Dashboard Routes
import Dashboard_Home from './components/Dashboard/Dashboard_Components/Dashboard_Home';
import Dashboard_Trucks from './components/Dashboard/Dashboard_Components/Dashboard_Trucks';
import Dashboard_Drivers from './components/Dashboard/Dashboard_Components/Dashboard_Drivers';
import Dashboard_Maintenance from './components/Dashboard/Dashboard_Components/Dashboard_Maintenance';
import Dashboard_Ifta from './components/Dashboard/Dashboard_Components/Dashboard_Ifta';
import Dashboard_1099 from './components/Dashboard/Dashboard_Components/Dashboard_1099';
import Dashboard_Fuel from './components/Dashboard/Dashboard_Components/Dashboard_Fuel';
import Dashboard_Navigation from './components/Dashboard/Dashboard_Components/Dashboard_Navigation';
import Dashboard_Contacts from './components/Dashboard/Dashboard_Components/Dashboard_Contacts';


export function baseRoutes() {
    return (
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/dashboard' component={Dashboard} />
        </Switch>
    )
}

export function dashboardRoutes() {
    return (
        <Switch>
            <Route path='/dashboard/trucks' component={Dashboard_Trucks} />
            <Route path='/dashboard/fuel' component={Dashboard_Fuel} />
            <Route path='/dashboard/drivers' component={Dashboard_Drivers} />
            <Route path='/dashboard/maintenance' component={Dashboard_Maintenance} />
            <Route path='/dashboard/ifta' component={Dashboard_Ifta} />
            <Route path='/dashboard/1099' component={Dashboard_1099} />
            <Route path='/dashboard/navigation' component={Dashboard_Navigation} />
            <Route path='/dashboard/contacts' component={Dashboard_Contacts} />
            <Route path='/' component={Dashboard_Home} />
        </Switch>
    )
}

