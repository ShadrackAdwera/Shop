import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '../UI/Card/card';
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

const SignUp = () => {
  const classes = useStyles();

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const signUp = async () => {
    const requestBody = {name, image,address,email,password}
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/users/sign-up',{
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    if(!response.ok) {
      setIsLoading(false)
      console.log(response)
      throw new Error('Failed to sign up. Try again.')
    }
    const resData = await response.json()
    console.log(resData)
    setIsLoading(false)
    setName('')
    setImage('')
    setAddress('')
    setEmail('')
    setPassword('')
    } catch (error) {
      setIsLoading(false)
      setError(error.message)
    }
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={()=>setError(null)}/>
    <Card className='authentication'>
      <div className={classes.root}>
      <h3>
        <strong>Sign Up</strong>
      </h3>
      <br />
      <TextField id="name" label="User Name" value={name} onChange={e=>setName(e.target.value)}/>
      <br />
      <TextField id="image" label="Image" value={image} onChange={e=>setImage(e.target.value)}/>
      <br />
      <TextField id="address" label="Address" value={address} onChange={e=>setAddress(e.target.value)}/>
      <br />
      <TextField id="email" label="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <br />
      <TextField id="password" label="Password" type='password' value={password} onChange={e=>setPassword(e.target.value)}/>
      <br />
      <br/>
      {isLoading? <CircularProgress/> : <Button variant="contained" color="primary" onClick={signUp}>
        <strong>SUBMIT</strong>
      </Button>}
      <br/>
      <br/>
      <NavLink to='/'>Have an account? Login</NavLink>
      
    </div>
    </Card>
    </React.Fragment>
  );
};

export default SignUp;
