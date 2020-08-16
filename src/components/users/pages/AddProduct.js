import React, { useReducer, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Card from '../../UI/Card/card';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { CircularProgress } from '@material-ui/core';


import ErrorModal from '../../UI/ErrorModal';
import { useHttp } from '../../../shared/http-hook'
import { AuthContext } from '../../../shared/auth-context'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const colors = ['black', 'white', 'brown', 'blue', 'maroon', 'yellow'];
const sizes = ['37','38','39','40','41','42','43','44','45']

const initialState = {
  name: '',
  description: '',
  sizes: [],
  colors: [],
  price: 0,
  creator: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.value };
    case 'SET_DESCRIPTION':
      return { ...state, description: action.value };
    case 'SET_IMAGE_ONE':
      return {
        ...state,
        imageUrls: { ...state.imageUrls, angleOne: action.value },
      };
    case 'SET_IMAGE_TWO':
      return {
        ...state,
        imageUrls: { ...state.imageUrls, angleTwo: action.value },
      };
    case 'SET_IMAGE_THREE':
      return {
        ...state,
        imageUrls: { ...state.imageUrls, angleThree: action.value },
      };
    case 'SET_SIZES':
      return { ...state, sizes: action.value };
    case 'SET_COLORS':
      return { ...state, colors: action.value };
    case 'SET_PRICE':
      return { ...state, price: action.value };
    // case 'SET_CREATOR':
    //   return { ...state, creator: action.value };
    case 'CLEAR_FORM':
      return initialState
    default:
      return state;
  }
};

const AddProduct = () => {
  const classes = useStyles();
  const [formState, dispatch] = useReducer(reducer, initialState);
  const { isLoading, error, sendRequest, clearError } = useHttp() 
  const [images, setImages] = useState('')
  const auth = useContext(AuthContext)
  //const history = useHistory()

  const createProduct = async () => {
    const url = 'http://localhost:5000/api/products/new'
    const formData = new FormData()
    formData.append('name', formState.name)
    formData.append('description', formState.description)
    for(const key of Object.keys(images)) {
      formData.append('images', images[key])
    }
    formData.append('sizes',formState.sizes)
    formData.append('colors',formState.colors)
    formData.append('price',formState.price)
    formData.append('creator',auth.userId)
  //   for (const key of formData.entries()) {
  //     console.log(key[0] + ', ' + key[1]);
  // }
    try {
      await sendRequest(url, 'POST', formData, { Authorization: `Bearer ${auth.token}` })
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        <div className={classes.root}>
          <h3>
            <strong>Create Product</strong>
          </h3>
          <br />
          <TextField
            id="name"
            label="Product Name"
            value={formState.name}
            onChange={(e) =>
              dispatch({ type: 'SET_NAME', value: e.target.value })
            }
          />
          <br />
          <TextField
            id="description"
            label="Product Description"
            value={formState.description}
            onChange={(e) =>
              dispatch({ type: 'SET_DESCRIPTION', value: e.target.value })
            }
          />
          <br />
          <div>
            <label htmlFor="file"> 4 Images (different angles) </label>
            <br/>
            <br/>
            <input type='file' name = 'file' id='file' multiple onChange={e=>setImages(e.target.files)}/>
          </div>
          <br />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">
              Sizes Available
            </InputLabel>
            <Select
              labelId="sizes-label-id"
              id="multiple-sizes"
              multiple
              value={formState.sizes}
              onChange={(event)=>dispatch({ type: 'SET_SIZES', value: event.target.value })}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {sizes.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={formState.sizes.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">
              Colors Available
            </InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple
              value={formState.colors}
              onChange={(event)=>dispatch({ type: 'SET_COLORS', value: event.target.value })}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {colors.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={formState.colors.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="price"
            label="Price"
            value={formState.price}
            onChange={(e) =>
              dispatch({ type: 'SET_PRICE', value: e.target.value })
            }
          />
          <br />
          {/* <TextField
            id="creator"
            label="creator"
            type="creator"
            value={formState.creator}
            onChange={(e) =>
              dispatch({ type: 'SET_CREATOR', value: e.target.value })
            }
          />
          <br /> */}
          <br />
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button variant="contained" color="primary" onClick={createProduct}>
              <strong>SUBMIT</strong>
            </Button>
          )}
          <br />
          <br />
          <NavLink to="/">Go Bacc</NavLink>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default AddProduct;
