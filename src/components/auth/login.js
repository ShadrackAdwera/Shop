import React, { useState, useReducer, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';
import { AuthContext } from '../../shared/auth-context'
import ErrorModal from '../UI/ErrorModal';
import Card from '../UI/Card/card';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '32ch',
    },
  },
}));

const initialState = {
  email: '',
  password: '',
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.value };
    case 'SET_PASSWORD':
      return { ...state, password: action.value };
    case 'RESET_FORM':
      return initialState;
    default:
      throw new Error('There aint no sh*t here!');
  }
};

const LogIn = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext)
  const [formState, dispatch] = useReducer(loginReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory()

  const logIn = async () => {
    const userInfo = { email: formState.email, password: formState.password };
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
      const resData = await response.json();
      setIsLoading(false)
      if (!response.ok) {
          setIsLoading(false);
          throw new Error(resData.error);
      } else {
        auth.login()
        history.push('/')
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={() => setError(null)} />
      <Card className="authentication">
        <div className={classes.root}>
          <h2>
            <strong>Login</strong>
          </h2>
          <br />
          <TextField
            id="email"
            label="Email"
            autoComplete="on"
            value={formState.email}
            onChange={(e) =>
              dispatch({ type: 'SET_EMAIL', value: e.target.value })
            }
          />
          <br />
          <TextField
            id="password"
            label="Password"
            type="password"
            autoComplete="on"
            value={formState.password}
            onChange={(e) =>
              dispatch({ type: 'SET_PASSWORD', value: e.target.value })
            }
          />
          <br />
          <br />
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button variant="contained" color="primary" onClick={logIn}>
              <strong>SUBMIT</strong>
            </Button>
          )}
          <br />
          <br />
          <NavLink to="/sign-up">Don't have an account? Sign Up</NavLink>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default LogIn;
