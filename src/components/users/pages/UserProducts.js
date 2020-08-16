import React, { useEffect, useReducer, useCallback, useContext } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import { CircularProgress } from '@material-ui/core';
import { useHttp } from '../../../shared/http-hook'
import { AuthContext } from '../../../shared/auth-context'
import Card from '../../UI/Card/card';
import ErrorModal from '../../UI/ErrorModal';
import 'react-alice-carousel/lib/alice-carousel.css';

const initialState = {
  userProducts: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, userProducts: action.products };
    default:
      return state;
  }
};

const UserProducts = () => {
  const id = useParams();
  const [productState, dispatch] = useReducer(reducer, initialState);
  const { isLoading, error, sendRequest, clearError } = useHttp()
  const auth = useContext(AuthContext)

  const fetchUserProducts = useCallback(async () => {
    const url = `http://localhost:5000/api/products/user/${id.id}`
    try{
      const resData = await sendRequest(url)
      dispatch({ type: 'SET_PRODUCTS', products: resData.products });
    } catch (error) {
      
    }
  }, [id, sendRequest]);

  useEffect(() => {
    fetchUserProducts();
  }, [fetchUserProducts]);

  return error? <ErrorModal error={error} onClear={clearError}/> :
  productState.userProducts.map((prod) => {
    return (
      <Card className="authentication" key={prod.id}>
        {isLoading? <CircularProgress /> : <AliceCarousel autoPlay autoPlayInterval={3000}>
          {prod.images.map((pd=><img key={pd} src={pd} className="sliderimg" alt="" />))}
        </AliceCarousel>}
        <div>
          <h2>{prod.name}</h2>
          <h4 style={{ color: 'blue', fontWeight: 'bold' }}>
            Ksh. {prod.price}
          </h4>
          <div style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent:'center' }}>
            <div style={{margin:'8px'}}>
              <NavLink to="">View Details</NavLink>
            </div>
            {auth.isLoggedIn && <div style={{margin:'8px'}}>
              <NavLink to="">Update Product</NavLink>
            </div>}
            {auth.isLoggedIn && <div style={{margin:'8px'}}>
              <NavLink to="">Delete Product</NavLink>
            </div>}
          </div>
        </div>
      </Card>
    );
  });
};

export default UserProducts;
