import {addCartItemRequest, addCartItemSuccess,addCartItemFail,getCartItemRequest,getCartItemSuccess,getCartItemFail,delCartItemRequest,delCartItemSuccess,delCartItemFail} from '../slices/cartSlice';
import axios from 'axios'
import { host } from '../host';

export const addCartItem = (id, quantity) => async(dispatch) => {
    try {
        dispatch(addCartItemRequest())
        const {data } = await axios.post(`${host}/api/create-cart/${id}` , {quantity})
        dispatch(addCartItemSuccess({data}))
    } catch (error) {
        dispatch(addCartItemFail(error.response.data.message))
    }
}

export const getCartItem = () => async(dispatch) => {
    try {
        dispatch(getCartItemRequest())
        const {data } = await axios.get(`${host}/api/get-cartItem`)
        dispatch(getCartItemSuccess({data}))
    } catch (error) {
        dispatch(getCartItemFail(error.response.data.message))
    }
}

export const delCartItem = (id) => async(dispatch) => {
    try {
        dispatch(delCartItemRequest())
        const {data } = await axios.get(`${host}/api/cart-delProduct/${id}`)
        dispatch(delCartItemSuccess({data}))
    } catch (error) {
        dispatch(delCartItemFail(error.response.data.message))
    }
}