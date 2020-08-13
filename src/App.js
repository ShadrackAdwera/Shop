import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Login from './components/auth/login'
import SignUp from './components/auth/sign-up'
import Users from './components/users/pages/Users'
import AddProduct from './components/users/pages/AddProduct'
import UserProducts from './components/users/pages/UserProducts'
import './App.css';
import ButtonAppBar from './components/Navigation/index';


function App() {

  let routes = <Switch>
  <Route exact path='/' component={Login} />
  <Route exact path='/sign-up' component={SignUp} />
  <Route exact path='/users' component={Users} />
  <Route exact path='/users/product/new' component={AddProduct} />
  <Route exact path ='/users/:id/products' component={UserProducts} />
</Switch>

  return (
    <React.Fragment>
      <ButtonAppBar />
      {routes}
    </React.Fragment>
  );
}

export default App;
