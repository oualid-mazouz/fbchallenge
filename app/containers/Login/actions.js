/*****
 Name:      Login Page reducer
 Author:    Mohamed Touil
 Company:   Thinline
 Date:      19/07/2017
*****/


import {EMAIL_CHANGE ,PASSWORD_CHANGE ,
        LOGIN_SUBMIT,
        VALIDATION_ERRORS,
        USER_IS_LOGGING
       } from './constants';

export const emailChanged = (email)=> {
    return {
        type: EMAIL_CHANGE,
        email
    }
}

export const passwordChanged = (password)=>{
    return {
        type: PASSWORD_CHANGE,
        password
    }
}

export const userIsLogging = (isLoading)=>{
    return {
        type: USER_IS_LOGGING,
        isLoading
    }
}

export const validationErrors = (data) =>{
    return {
        type: VALIDATION_ERRORS,
        data
    }
}
export const loginSubmit = (payload)=>{
    return {
        type: LOGIN_SUBMIT,
        payload

    }
}

export const reinitialMessages = ()=>{
  return {
    type :'REINITIAL_ERROR_MESSAGES'
  }
};


