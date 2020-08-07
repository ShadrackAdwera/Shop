import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Login from './components/auth/login'
import SignUp from './components/auth/sign-up'
import './App.css';


function App() {
  return (
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/sign-up' component={SignUp} />
    </Switch>
  );
}

export default App;
