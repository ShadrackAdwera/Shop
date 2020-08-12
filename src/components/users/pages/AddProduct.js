import React, { useReducer, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
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

const initialState = {
  name: '',
  description: '',
  imageUrls: {
    angleOne: '',
    angleTwo: '',
    angleThree: '',
  },
  sizes: {
    sm: 0,
    md: 0,
    lg: 0,
    xl: 0,
  },
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
    case 'SET_SM_SIZE':
      return { ...state, sizes: { ...state.sizes, sm: action.value } };
    case 'SET_MD_SIZE':
      return { ...state, sizes: { ...state.sizes, md: action.value } };
    case 'SET_LG_SIZE':
      return { ...state, sizes: { ...state.sizes, lg: action.value } };
    case 'SET_XL_SIZE':
      return { ...state, sizes: { ...state.sizes, xl: action.value } };
    case 'SET_COLORS':
      return { ...state, colors: action.value };
    case 'SET_PRICE':
      return { ...state, price: action.value };
    case 'SET_CREATOR':
      return { ...state, creator: action.value };
    case 'CLEAR_FORM':
      return initialState
    default:
      return state;
  }
};

const AddProduct = () => {
  const classes = useStyles();
  const [formState, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [productColor, setProductColor] = useState([]);
  const history = useHistory()

  const createProduct = async () => {
    setIsLoading(true);
    const newProduct = {
      name: formState.name,
      description: formState.description,
      imageUrls: {
        angleOne: formState.imageUrls.angleOne,
        angleTwo: formState.imageUrls.angleTwo,
        angleThree: formState.imageUrls.angleThree,
      },
      sizes: {
        sm: formState.sizes.sm,
        md:formState.sizes.md,
        lg:formState.sizes.lg,
        xl:formState.sizes.xl
      },
      colors: formState.colors,
      price: formState.price,
      creator: formState.creator
    }
    try {
      const response = await fetch('http://localhost:5000/api/products/new', {
      method:'POST',
      body: JSON.stringify(newProduct),
      headers: {
        'Content-Type':'application/json'
      }
    })
    const resData = await response.json()
    console.log(resData)
    setIsLoading(false)
    history.push('/users')
    } catch (error) {
      setIsLoading(false)
      setError(error.message)
    }
    
  };

  const handleChange = (event) => {
    setProductColor(event.target.value);
    dispatch({ type: 'SET_COLORS', value: event.target.value });
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={() => setError(null)} />
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
            <TextField
              id="imageOne"
              label="Image Angle One"
              value={formState.imageUrls.angleOne}
              onChange={(e) =>
                dispatch({ type: 'SET_IMAGE_ONE', value: e.target.value })
              }
            />
            <TextField
              id="imageTwo"
              label="Image Angle Two"
              value={formState.imageUrls.angleTwo}
              onChange={(e) =>
                dispatch({ type: 'SET_IMAGE_TWO', value: e.target.value })
              }
            />
            <TextField
              id="imageThree"
              label="Image Angle Three"
              value={formState.imageUrls.angleThree}
              onChange={(e) =>
                dispatch({ type: 'SET_IMAGE_THREE', value: e.target.value })
              }
            />
          </div>
          <br />
          <div>
            <TextField
              id="sizeSmall"
              label="Size Small"
              type="number"
              min={0}
              value={formState.sizes.sm}
              onChange={(e) =>
                dispatch({ type: 'SET_SM_SIZE', value: e.target.value })
              }
            />
            <TextField
              id="sizeMedium"
              label="Size Medium"
              value={formState.sizes.md}
              onChange={(e) =>
                dispatch({ type: 'SET_MD_SIZE', value: e.target.value })
              }
            />
            <TextField
              id="sizeLarge"
              label="Size Large"
              value={formState.sizes.lg}
              onChange={(e) =>
                dispatch({ type: 'SET_LG_SIZE', value: e.target.value })
              }
            />
            <TextField
              id="sizeXlarge"
              label="Size x-large"
              value={formState.sizes.xl}
              onChange={(e) =>
                dispatch({ type: 'SET_XL_SIZE', value: e.target.value })
              }
            />
          </div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">
              Chose colors
            </InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple
              value={productColor}
              onChange={handleChange}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {colors.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={productColor.indexOf(name) > -1} />
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
          <TextField
            id="creator"
            label="creator"
            type="creator"
            value={formState.creator}
            onChange={(e) =>
              dispatch({ type: 'SET_CREATOR', value: e.target.value })
            }
          />
          <br />
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
          <NavLink to="/users">Go Bacc</NavLink>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default AddProduct;
