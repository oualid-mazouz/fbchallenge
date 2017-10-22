/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import {Navbar,NavItem,Button} from 'react-materialize';
import '../../styles/homepage/index.css';
import firebase from 'firebase';
import { browserHistory } from 'react-router';

const Nav = ()=> (
  <Navbar brand='Challenge' style={{paddingLeft:10}} className="grey darken-4" right>
    <NavItem href='#'>FullStack Development</NavItem>
    <Button waves='light'  flat={true} onClick={logout}><span className="logBtn"> {localStorage.getItem('token') ? 'Logout' : 'Login'}</span></Button>
  </Navbar>
);

const logout = (event)=>{
  event.preventDefault();

  firebase.auth().signOut().then(function() {

    localStorage.removeItem('token');
    browserHistory.push('/');

  }, function(error) {
    console.log(error);
  });

};

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  constructor(props){
    super(props);
  }

  componentWillMount(){
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBH_9eT8FBaW8wmDaCyBa-LhV7F7zXIJr0",
      authDomain: "oualidchallenge.firebaseapp.com",
      databaseURL: "https://oualidchallenge.firebaseio.com",
      projectId: "oualidchallenge",
      storageBucket: "",
      messagingSenderId: "988662505422"
    };
    firebase.initializeApp(config);

  }

  render() {
    return (
      <div>
        {Nav()}
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}
