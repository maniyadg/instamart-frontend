import { addshippingInfoFail, addshippingInfoRequest, addshippingInfoSuccess, getshippingInfoSuccess,getshippingInfoFail, getshippingInfoRequest } from '../slices/shippingSlice';
import axios from 'axios';
import { host } from '../host';

export const getAddress = () => async (dispatch) => {

    try {
        dispatch(getshippingInfoRequest())
        const { data }  = await axios.get(`${host}/api/getAddress`);
        console.log(data)
        dispatch(getshippingInfoSuccess(data))
    } catch (error) {
        console.log(error)
        dispatch(getshippingInfoFail(error.response))
    }

}


export const createAddress = (name,country,city,address,phoneNo,postalCode) => async (dispatch) => {

    try {
        dispatch(addshippingInfoRequest())
 

        const  {data}   = await axios.post(`${host}/api/addAddress`,
        {name,country,city,address,phoneNo,postalCode});

        dispatch(addshippingInfoSuccess(data))
    } catch (error) {
        dispatch(addshippingInfoFail(error.response))
    }

}






