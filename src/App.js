import React from 'react';
import { HashRouter as Router, Switch, Route} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import SignIn from './views/SignIn';
import Dashboard from './views/Dashboard';
import Sites from './views/Sites';
import ObjectDetails from './views/ObjectDetails';
import Admin from './views/Admin';
import System from './views/System';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import './App.css';
import {useDispatch} from 'react-redux';
import {connectMqtt} from './redux/actions/mqtt'

function App() {

    const dispatch = useDispatch()
    dispatch(connectMqtt());

    return(
        <Router>
            <Route path="/login" component ={SignIn}/>
            <Switch>
                <PrivateRoute exact path="/">
                    <Dashboard />
                </PrivateRoute>
                <PrivateRoute exact path="/site">
                    <Sites />
                </PrivateRoute>
                <PrivateRoute exact path="/adm">
                    <Admin />
                </PrivateRoute>
                <PrivateRoute exact path="/objdetail">
                    <ObjectDetails />
                </PrivateRoute>
                <PrivateRoute exact path="/system">
                    <System />
                </PrivateRoute>
            </Switch>
        </Router>
    )
}

export default App;