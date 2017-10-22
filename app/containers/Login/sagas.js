import {call, take ,put , fork,cancelled} from 'redux-saga/effects';
import firebase from 'firebase';
import { push } from 'react-router-redux';



function *auth(email,password) {

    try {

        const token = yield call(function(){

            return new Promise(function(resolve,reject){

                firebase.auth().signInWithEmailAndPassword(email,password).then((user)=>{

                    var uid = user.uid;
                    var userToken = firebase.auth().currentUser.getIdToken(true).then((token)=>{

                        resolve(token);

                    });

                }).catch((err)=>{
                    //was obliged to resolve something instead of letting the promise being rejected
                    let e = {
                        message : err.message,
                        code : 404
                    };
                    resolve(e);
                });

            });
        });
        console.log(token);
        if(token.code === 404){

            throw token;
        }

        yield put({type:'LOGIN_SUCCESS',token});

        localStorage.setItem('token',token);
        yield put(push('/home/'));

    }catch(error){
        //user could not authenticate in firebase

        yield put({type:'LOGIN_ERROR',error});

    }finally {

        if (yield cancelled()) {
            console.log('auth fork has been cancelled');
        }
    }
}

function *loginSaga(){


    while(true){
        try {
            const data = yield take('LOGIN_SUBMIT');
          yield put({type:'USER_IS_LOGGING',isLoading: true});
            console.log('submit to saga');
            var email = data.payload.email , password = data.payload.password;
            const task = yield fork(auth, email, password);
            const log = yield take('LOGIN_ERROR');
            console.log('-------cancel ');
            yield cancel(task);

        }catch(err){
            localStorage.removeItem('token');
            yield put({type:'USER_IS_LOGGING',isLoading: false});
            console.log('error has been launched ,cancel the forked process ');
        }

    }

}

//boostrapping the sagas
export default [
    //helloSaga,
    loginSaga
];
