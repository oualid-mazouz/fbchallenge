import React from 'react';
import {Row,Col,Button,Input,Preloader} from 'react-materialize';

import '../../styles/login/login.css';


class LoginForm extends React.Component {



    render(){

        const {onSubmit,onEmailChange,onPasswordChange,errors,onEnterPressed,isLoading} = this.props;
        console.log('isLoading',isLoading);
        return (
            <div className="containerLogin">

                <Row className="valign-wrapper">
                    <Col l={9} offset="l5 m5 s3" className="valign center-block">
                      <h3 style={{fontFamily:'Brandon Grotesque Bold'}}>S'authentifier </h3>
                        <form onSubmit={onSubmit}>
                        <Input s={9} l={9}  style={{width:'50%'}}  placeholder="login" validate onChange={onEmailChange}/>
                        <Input s={9} l={9} style={{width:'50%'}} type="password" placeholder="password" validate onChange={onPasswordChange} onKeyPress={onEnterPressed}/>
                        </form>
                    </Col>

                </Row>

                <Row>
                    <Col l={9} offset="l5 m5 s3">
                        {
                          isLoading ? (<Preloader className="preloaderLogin" size='small'/>) : (<Button  waves='light' style={{width:'25%'}}   type="button" onClick={onSubmit}> Login</Button>)
                        }

                    </Col>
                    <Col l={9} offset="l5 m5 s3" style={{width:350}}>
                        {errors.get('summary') && <p className="error-message">{errors.get('summary')}</p>}
                        {<p className="error-message">{errors.get('email')}</p>}
                        {<p className="error-message">{errors.get('password')}</p>}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default LoginForm;
