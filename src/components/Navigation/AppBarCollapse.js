import React from "react";
import { Button, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ButtonAppBarCollapse from "./ButtonAppBarCollapse";

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

const AppBarCollapse = props => (
  <div className={props.classes.root}>
    <ButtonAppBarCollapse>
      <MenuItem>USERS</MenuItem>
      <MenuItem>MY PRODUCTS</MenuItem>
      <MenuItem>ADD PRODUCTS</MenuItem>
      <MenuItem>LOGIN</MenuItem>
      <MenuItem>SIGN UP</MenuItem>
    </ButtonAppBarCollapse>
    <div className={props.classes.buttonBar} id="appbar-collapse">
      <Button color="inherit">USERS</Button>
      <Button color="inherit">MY PRODUCTS</Button>
      <Button color="inherit">ADD PRODUCTS</Button>
      <Button color="inherit">LOGIN</Button>
      <Button color="inherit">SIGN UP</Button>
    </div>
  </div>
);

export default withStyles(styles)(AppBarCollapse);