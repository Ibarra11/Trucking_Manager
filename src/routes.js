import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';

export default (
    <Switch>
        <Route path='/' component={Home} />
    </Switch>
)