import React, { useState, useCallback } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/auth/login'
import SignUp from './components/auth/sign-up'
import Users from './components/users/pages/Users'
import AddProduct from './components/users/pages/AddProduct'
import UserProducts from './components/users/pages/UserProducts'
import ButtonAppBar from './components/Navigation/index';
import { AuthContext } from './shared/auth-context'
import './App.css';


function App() {
  const [userId, setUserId] = useState()
  const [token, setToken] = useState()

  const login = useCallback((uid, authToken)=>{
    setUserId(uid)
    setToken(authToken)
  },[])

  const logout = useCallback(()=>{
    setUserId(null)
    setToken(null)
  },[])

  let routes

if(token) {
  routes = <Switch>
        <Route exact path='/' component={Users} />
        <Route exact path='/users/product/new' component={AddProduct} />
        <Route exact path ='/users/:id/products' component={UserProducts} />
        <Redirect to='/login'/>
  </Switch>
} else {
  routes = <Switch>
  <Route exact path='/' component={Users} />
  <Route exact path='/login' component={Login} />
  <Route exact path='/sign-up' component={SignUp} />
  <Redirect to='/login'/>
</Switch>
}

  return (
    <AuthContext.Provider value={{isLoggedIn: !!token,  userId, token ,login, logout}}>
      <React.Fragment>
      <ButtonAppBar />
      <main style={{marginTop:'12%'}}>
      {routes}
      </main>
    </React.Fragment>
    </AuthContext.Provider>
  );
}

export default App;
