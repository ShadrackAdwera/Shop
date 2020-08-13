import React, { useContext } from "react";
import { useHistory } from 'react-router-dom'
import { Button, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ButtonAppBarCollapse from "./ButtonAppBarCollapse";
import { AuthContext } from '../../shared/auth-context'

const styles = theme => ({
  root: {
    position: "absolute",
    right: 0
  },
  buttonBar: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
    margin: "10px",
    paddingLeft: "16px",
    right: 0,
    position: "relative",
    width: "100%",
    background: "transparent"
  }
});

const AppBarCollapse = props => {

  const auth = useContext(AuthContext)
  const history = useHistory()

  const handleLogout = () => {
    auth.logout()
    history.push('/')
  }

  return <div className={props.classes.root}>
    <ButtonAppBarCollapse>
      <MenuItem onClick={()=>history.push('/')}>USERS</MenuItem>
      {auth.isLoggedIn && <MenuItem>MY PRODUCTS</MenuItem>}
      {auth.isLoggedIn &&<MenuItem onClick={()=>history.push('/users/product/new')}>ADD PRODUCTS</MenuItem>}
      {!auth.isLoggedIn? <MenuItem onClick={()=>history.push('/login')}>LOGIN</MenuItem>: <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>}
      {!auth.isLoggedIn &&<MenuItem onClick={()=>history.push('/sign-up')}>SIGN UP</MenuItem>}
    </ButtonAppBarCollapse>
    <div className={props.classes.buttonBar} id="appbar-collapse">
      <Button color="inherit" onClick={()=>history.push('/')}>USERS</Button>
      {auth.isLoggedIn &&<Button color="inherit">MY PRODUCTS</Button>}
      {auth.isLoggedIn &&<Button color="inherit" onClick={()=>history.push('/users/product/new')}>ADD PRODUCTS</Button>}
      {!auth.isLoggedIn?<Button color="inherit" onClick={()=>history.push('/login')}>LOGIN</Button> : <Button color="inherit" onClick={handleLogout}>LOGOUT</Button>}
      {!auth.isLoggedIn &&<Button color="inherit" onClick={()=>history.push('/sign-up')}>SIGN UP</Button>}
    </div>
  </div>
};

export default withStyles(styles)(AppBarCollapse);