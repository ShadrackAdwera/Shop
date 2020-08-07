import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '../UI/card';
import { NavLink } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import ErrorModal from '../UI/ErrorModal';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const LogIn = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const logIn = async () => {
      const userInfo = {email,password}
      setIsLoading(true)
      try {
        const response = await fetch('http://localhost:5000/api/users/login', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        if(!response.ok) {
            throw new Error('Could not login')
        }
        const resData = await response.json()
        setIsLoading(false)
        console.log(resData)
      } catch (error) {
          setError(error.message)
          setIsLoading(false)
      }
      setEmail('')
      setPassword('')
  }

  return (
      <React.Fragment>
      <ErrorModal error={error} onClear={()=>setError(null)}/>
    <Card className="authentication">
      <div className={classes.root}>
        <h2>
          <strong>Login</strong>
        </h2>
        <br />
        <TextField id="email" label="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
        <br />
        <TextField id="password" label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        <br />
        <br />
        {isLoading? <CircularProgress/> : <Button variant="contained" color="primary" onClick={logIn}>
          <strong>SUBMIT</strong>
        </Button>}
        <br />
        <br />
        <NavLink to="/sign-up">Don't have an account? Sign Up</NavLink>
      </div>
    </Card>
    </React.Fragment>
  );
};

export default LogIn;
