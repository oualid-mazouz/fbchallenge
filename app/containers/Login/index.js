/*
 *
 * Login
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {makeSelectLogin ,makeSelectError,makeSelectIsLoading} from './selectors';
import validator from 'validator';
import {emailChanged,passwordChanged,
  validationErrors,userIsLogging,
  loginSubmit,reinitialMessages
} from './actions';

import LoginForm from '../../components/LoginForm';

export class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);
    //binding the component's methods for performance reason
    this.processForm = this.processForm.bind(this);
    this.onEmailChanged = this.onEmailChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.validateLoginForm = this.validateLoginForm.bind(this);
    this.checkPressed = this.checkPressed.bind(this);


  }

  validateLoginForm(payload) {

    const errors = {};
    let isFormValid = true;
    let message = '';

    if(!validator.isEmail(payload.email)){

      isFormValid = false;
      errors.email = 'Please provide a valid email';
    }
    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 5) {
      isFormValid = false;
      errors.password = 'Please provide your password.(5 characters at least)';
    }

    if (!isFormValid) {
      message = 'Check the form for errors.';
    }

    return {
      success: isFormValid,
      message,
      errors
    };
  }

  checkPressed(event){

    if(event.which === 13 || event.keyCode === 13) {
      this.processForm(event);
    }
  }

  processForm(event) {
    // prevent default action. in this case, action is the form submission event

    event.preventDefault();
    this.props.userIsLogging(true);
    this.props.reinitialMessages();
    const email = this.props.user.get('email');
    const password = this.props.user.get('password');
    const formData = {
      email,
      password
    };

    const validationResult = this.validateLoginForm(formData);

    if (!validationResult.success) {

      this.props.validationErrors(validationResult);

      return {
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      };
    }
    let self = this ;

    setTimeout(function () {
      self.props.loginSubmit({email,password});
    },2000);


    return {success:true, message: 'success'};
  }



  onEmailChanged(event){

    this.props.emailChanged(event.target.value);
  }

  onPasswordChanged (event){

    this.props.passwordChanged(event.target.value);
  }

  render() {
    return (
      <div>
        <LoginForm
          onSubmit={this.processForm}
          onEmailChange= {this.onEmailChanged}
          onPasswordChange={this.onPasswordChanged}
          errors={this.props.errors}
          user={this.props.user}
          isLoading={this.props.isLoading}
          onEnterPressed={this.checkPressed}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectLogin(),
  errors:makeSelectError(),
  isLoading:makeSelectIsLoading()
});


export default connect(mapStateToProps, {emailChanged,passwordChanged,loginSubmit,validationErrors,userIsLogging,reinitialMessages})(Login);
