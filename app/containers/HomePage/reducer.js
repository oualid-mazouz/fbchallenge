/*
 *  Author : Oualid Mazouz
 *  Create : 19/10/2017
 *  Email  : oualid.mazouz@gmail.com
 *  reducer : Using ImmutableJS (Make State mutable)
 *
 */

import { fromJS } from 'immutable';


const initialState = fromJS({

  credentials: {
    loggedIn:localStorage.getItem('connectionStatus'),
    id: null,
    token: null
  },
  details: {},


});

function homeReducer(state = initialState, action) {
  switch (action.type) {

      case 'CONNECT_USER':
        console.log('hopefully',action.payload);
          return state
                  .setIn(['credentials','loggedIn'],true)
                  .setIn(['credentials','id'],action.payload.id)
                  .setIn(['credentials','token'],action.payload.token)




      case 'LOGOUT_USER':
        console.log('log it out ');
        return state
                  .setIn(['credentials','loggedIn'],false)
                  .setIn(['credentials','id'],null)
                  .setIn(['credentials','token'],null);



    default:
      return state;
  }
}

export default homeReducer;
