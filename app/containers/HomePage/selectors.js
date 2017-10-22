/*****
 Name:      Home Page reducer
 Author:    Oualid Mazouz
 Date:      19/10/2017
*****/

import {createSelector} from 'reselect';

const selectHome = (state)=> state.get('home'); //get immutable Map Array

const makeSelectCredentials = ()=> createSelector(
    selectHome,
    (homeState) => homeState.get('credentials')
);

const makeSelectDetails = ()=> createSelector(
    selectHome,
    (homeDetailState) => homeDetailState.get('details')
);

/*const makeSelectLoggedIn = ()=> createSelector(
  selectHome,
  (homeLoggedState) => homeLoggedState.get('loggedIn')
);*/

export {
    selectHome,
    makeSelectCredentials,
    makeSelectDetails,
    //makeSelectLoggedIn
};
