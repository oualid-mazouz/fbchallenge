/*****
 Name:      Login Page reducer
 Author:    Mohamed Touil
 Company:   Thinline
 Date:      19/07/2017
*****/

import {createSelector} from 'reselect';

const selectLogin = (state)=> state.get('login'); //get immutable Map Array

const makeSelectLogin = ()=> createSelector(
    selectLogin,
    (loginState) => loginState.get('user')
);

const makeSelectError = ()=> createSelector(
    selectLogin,
    (errorState)=> errorState.get('errors')
);

const makeSelectIsLoading = ()=> createSelector(
    selectLogin,
    (isLoadingState)=> isLoadingState.get('isLoading')
);

export {
    selectLogin,
    makeSelectLogin,
    makeSelectError,
    makeSelectIsLoading
};
