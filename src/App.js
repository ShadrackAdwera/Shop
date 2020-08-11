import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Login from './components/auth/login'
import SignUp from './components/auth/sign-up'
import Users from './components/users/pages/Users'
import './App.css';


function App() {
  return (
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/sign-up' component={SignUp} />
      <Route exact path='/users' component={Users} />
    </Switch>
  );
}

export default App;
