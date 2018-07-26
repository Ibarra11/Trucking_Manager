import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Base Routes
import Home from './components/Home/Home';
import Login from './components/Login/Login';
// import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';

// Dashboard Routes
import Dashboard_Home from './components/Dashboard/Dashboard_Components/Dashboard_Home';
import Dashboard_Trucks from './components/Dashboard/Dashboard_Components/Dashboard_Trucks/Dashboard_Trucks';
import Dashboard_Drivers from './components/Dashboard/Dashboard_Components/Dashboard_Drivers/Dashboard_Drivers';
import Dashboard_Payroll from './components/Dashboard/Dashboard_Components/Dashboard_Payroll/Dashboard_Payroll';
import Dashboard_Notifications from './components/Dashboard/Dashboard_Components/Dashboard_Notifications/Dashboard_Notifications';
import Dashboard_Expenses from './components/Dashboard/Dashboard_Components/Dashboard_Expenses/Dashboard_Expenses';
import Dashboard_Navigation from './components/Dashboard/Dashboard_Components/Dashboard_Navigation';
import Dashboard_Contacts from './components/Dashboard/Dashboard_Components/Dashboard_Contacts/Dashboard_Contacts';
import Dashboard_Dispatch from './components/Dashboard/Dashboard_Components/Dashboard_Dispatch/Dashboard_Dispatch';

// Dashboard Truck Routes
import Dashboard_Trucks_Add from './components/Dashboard/Dashboard_Components/Dashboard_Trucks/Dashboard_Trucks_Add';
import Dashboard_Trucks_Table from './components/Dashboard/Dashboard_Components/Dashboard_Trucks/Dashboard_Trucks_Table';

// Dashboard Driver Routes
import Dashboard_Drivers_Add from './components/Dashboard/Dashboard_Components/Dashboard_Drivers/Dashboard_Drivers_Add';

// Dashboard Contacts Routes
import Dashboard_Contacts_Add from './components/Dashboard/Dashboard_Components/Dashboard_Contacts/Dashboard_Contacts_Add';
import Dashboard_Contacts_Mail from './components/Dashboard/Dashboard_Components/Dashboard_Contacts/Dashboard_Contacts_Mail';

// Dashboard Payroll routes
import Dashboard_Payroll_Add from './components/Dashboard/Dashboard_Components/Dashboard_Payroll/Dashboard_Payroll_Add';



// Dashboard Expenses Rotues
import Dashboard_Add_Expense from './components/Dashboard/Dashboard_Components/Dashboard_Expenses/Dashboard_Add_Expense';
import Dashboard_Add_Category from './components/Dashboard/Dashboard_Components/Dashboard_Expenses/Dashboard_Add_Category';


export function baseRoutes() {
    return (
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            {/* <Route path='/register' component={Register} /> */}
            <Route path='/dashboard' component={Dashboard} />
        </Switch>
    )
}
export function dashboardRoutes() {
    return (
        <Switch>
            <Route path='/dashboard/trucks/add' component={Dashboard_Trucks_Add} />
            <Route path='/dashboard/trucks' component={Dashboard_Trucks} />
            <Route path='/dashboard/expenses/add/expense' component={Dashboard_Add_Expense} />
            <Route path='/dashboard/expenses/add/category' component={Dashboard_Add_Category} />
            <Route path='/dashboard/expenses' component={Dashboard_Expenses} />
            <Route path='/dashboard/drivers' component={Dashboard_Drivers} />
            <Route path='/dashboard/payroll/add' component={Dashboard_Payroll_Add} />
            <Route path='/dashboard/payroll' component={Dashboard_Payroll} />
            <Route path='/dashboard/notifications' component={Dashboard_Notifications} />
            <Route path='/dashboard/navigation' component={Dashboard_Navigation} />
            <Route path='/dashboard/contacts/add' component={Dashboard_Contacts_Add} />
            <Route path='/dashboard/contacts/mail' component={Dashboard_Contacts_Mail} />
            <Route path='/dashboard/contacts' component={Dashboard_Contacts} />
            <Route path='/dashboard/dispatch' component={Dashboard_Dispatch} />
            <Route path='/' component={Dashboard_Home} />
        </Switch>
    )
}

export function dashboardDriversRoutes() {
    return (
        <Switch>
            <Route path='/dashboard/drivers/add' component={Dashboard_Drivers_Add} />
        </Switch>
    )
}

export function dashboardTruckRoutes() {
    return (
        <Switch>
            <Route path='/dashboard/trucks/add' component={Dashboard_Trucks_Add} />
            <Route  component={Dashboard_Trucks_Table} />
        </Switch>
    )
}

