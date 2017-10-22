/*****
 Name:      Login Page reducer
 Author:    Mohamed Touil
 Company:   Thinline
 Date:      19/07/2017
*****/


import { fromJS } from 'immutable';

import {EMAIL_CHANGE ,PASSWORD_CHANGE,LOGIN_ERROR,VALIDATION_ERRORS,USER_IS_LOGGING} from './constants';

const InitialState = fromJS({
    user: {
        email: '',
        password: '',

    },
    errors:{
        email: '',
        password: '',
        summary: ''
    },
    isLoading:false
});

function LoginReducer(state = InitialState ,action){

    switch(action.type){

        case EMAIL_CHANGE:
            return state
                  .setIn(['user','email'],action.email);

        case PASSWORD_CHANGE:
            return state
                    .setIn(['user','password'],action.password);

        case VALIDATION_ERRORS:

            return state
                   .setIn(['errors','email'],action.data.errors.email)
                   .setIn(['errors','password'],action.data.errors.password)
                   .setIn(['errors','summary'],action.data.message);

        case LOGIN_ERROR:

            return state
                   .setIn(['errors','email'],'')
                   .setIn(['errors','password'],'')
                   .setIn(['errors','summary'],action.error.message);

        case USER_IS_LOGGING:
            console.log(' reducer isloading',action.isLoading);
            return state
                    .set('isLoading',action.isLoading);

        case 'REINITIAL_ERROR_MESSAGES':
            console.log('reinitialize parametrees');
            return state
              .setIn(['errors','email'],'')
              .setIn(['errors','password'],'')
              .setIn(['errors','summary'],'');


        default:
            return state;
    }
}



export default LoginReducer;
