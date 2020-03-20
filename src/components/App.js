import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
 
import LoginForm from './Login/login';
import Dashboard from './Dashboard/dashboard';

var App = () => {

  return (
    <Router>
      <div className="App">
        <Switch>
        <Route exact path="/">
            <LoginForm />
        </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/login">
            <LoginForm />
        </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
