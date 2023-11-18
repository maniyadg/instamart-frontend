import { host } from '../host';
import {
    loginFail,
    loginRequest, 
    loginSuccess,
    registerRequest,
    registerSuccess,
    registerFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    clearError,
    logedoutSuccess,
    logedoutFail,
} from '../slices/authSlice';

import axios from 'axios';

export const login = (email, password) => async (dispatch) => {

    try {
        dispatch(loginRequest())
        const { data }  = await axios.post(`${host}/api/login`,{email,password});
        dispatch(loginSuccess(data))

    } catch (error) {
        dispatch(loginFail(error.response.data.message))
    }

}

export const clearAuthError = dispatch => {
    dispatch(clearError())
}

export const register = (userData) => async (dispatch) => {

    try {
        dispatch(registerRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const  {data}   = await axios.post(`${host}/api/register`,userData, config ,{withCredentials: true});

        dispatch(registerSuccess(data))
    } catch (error) {
        dispatch(registerFail(error.response))
    }

}


export const loadUser =  async (dispatch) => {

   try {
        dispatch(loadUserRequest())


        const { data }  = await axios.get(`${host}/api/singleuser`);
        dispatch(loadUserSuccess(data))
        
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message))
    }

 }

 export const logedout =  async (dispatch) => {

    try {
 
         await axios.get(`${host}/api/logedout`);
         dispatch(logedoutSuccess())
         
     } catch (error) {
         dispatch(logedoutFail)
     }
 
  }



