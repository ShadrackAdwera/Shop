import React, { useState, useReducer, useContext, useCallback } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '../UI/Card/card';
import { CircularProgress } from '@material-ui/core';
import { AuthContext } from '../../shared/auth-context'
import ImagePicker from '../UI/Image/ImageUpload'
import ErrorModal from '../UI/ErrorModal';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '32ch',
    },
  },
}));

const initialState = {
  name: '',
  image: {
    value: null,
    isValid: false,
    inputId: null
  },
  address: '',
  email: '',
  password: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.value };
    case 'SET_IMAGE':
      return { ...state, image: {...state.image, value: action.value, isValid: action.isValid, inputId: action.id} };
    case 'SET_ADDRESS':
      return { ...state, address: action.value };
    case 'SET_EMAIL':
      return { ...state, email: action.value };
    case 'SET_PASSWORD':
      return { ...state, password: action.value };
    case 'RESET_FORM':
      return initialState;
    default:
      throw new Error('There ain no shit herr!');
  }
};

const SignUp = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formState, dispatch] = useReducer(reducer, initialState);
  const history = useHistory()

  // {
  //   name: formState.name,
  //   image: formState.image,
  //   address: formState.address,
  //   email: formState.email,
  //   password: formState.password,
  // };

  const signUp = async () => {
    const formData = new FormData()
    formData.append('name', formState.name)
    formData.append('image', formState.image.value)
    formData.append('address', formState.address)
    formData.append('email', formState.email)
    formData.append('password', formState.password)
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/users/sign-up', {
        method: 'POST',
        body: formData,
      });
      const resData = await response.json();
      setIsLoading(false);
      if (!response.ok) {
        setIsLoading(false);
        dispatch({ type: 'RESET_FORM' });
        throw new Error(resData.error);
      } else {
        dispatch({ type: 'RESET_FORM' });
        auth.login()
        history.push('/')
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'SET_IMAGE',
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={() => setError(null)} />
      <Card className="authentication">
        <div className={classes.root}>
          <h3>
            <strong>Sign Up</strong>
          </h3>
          <br />
          <TextField
            id="name"
            label="User Name"
            value={formState.name}

            onChange={(e) =>
              dispatch({ type: 'SET_NAME', value: e.target.value })
            }
          />
          <br />
          <ImagePicker center id='image' onInput={inputHandler}/>
          <br/>
          <TextField
            id="address"
            label="Address"
            value={formState.address}
            onChange={(e) =>
              dispatch({ type: 'SET_ADDRESS', value: e.target.value })
            }
          />
          <br />
          <TextField
            id="email"
            label="Email"
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
            <Button variant="contained" color="primary" onClick={signUp}>
              <strong>SUBMIT</strong>
            </Button>
          )}
          <br />
          <br />
          <div className='center'>
          <NavLink to="/">Have an account? Login</NavLink>
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default SignUp;
