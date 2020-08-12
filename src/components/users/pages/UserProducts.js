import React, { useEffect, useReducer, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import AliceCarousel from 'react-alice-carousel';
import Card from '../../UI/Card/card'
import "react-alice-carousel/lib/alice-carousel.css";

const initialState = {
    userProducts: [],
    isLoading: false,
    error: null
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_PRODUCTS':
            return {...state, userProducts: action.products, isLoading: false}
        case 'FETCH_PRODUCTS':
            return {...state, isLoading: true}
        case 'FETCH_PRODUCTS_FAIL':
            return {...state, error: action.error}
        default:
            return state
    }
}

const UserProducts = () => {
    const id = useParams()
    const [productState, dispatch] = useReducer(reducer, initialState)

    const fetchUserProducts = useCallback(async () => {
        dispatch({type: 'FETCH_PRODUCTS'})
        try {
        const response = await fetch(`http://localhost:5000/api/products/user/${id.id}`)
        const resData = await response.json()
        if(!response.ok) {
            throw new Error('Could not fetch products')
        }
        dispatch({type: 'SET_PRODUCTS', products: resData.products})
        } catch (error) {
            dispatch({type: 'FETCH_PRODUCTS_FAIL', error: error.message})
        }
    },[id])

    useEffect(()=>{
        fetchUserProducts()
    },[fetchUserProducts])

   return productState.userProducts.map(prod=>{
       return <Card className="authentication" key={prod.id}>
        <AliceCarousel autoPlay autoPlayInterval={3000}>
      <img src={prod.imageUrls.angleOne} className="sliderimg" alt=""/>
      <img src={prod.imageUrls.angleOne} className="sliderimg" alt=""/>
      <img src={prod.imageUrls.angleOne} className="sliderimg" alt=""/>
    </AliceCarousel>
    <div>
   <h2>{prod.name}</h2>
   <h4 style={{color:'blue', fontWeight:'bold'}}>Ksh. {prod.price}</h4>
    </div>
           
       </Card>
   })
}

export default UserProducts