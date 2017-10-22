
import { take,call } from 'redux-saga/effects';

export function* defaultSaga() {
    // See example in containers/HomePage/sagas.js
    console.log('home page saga now up and running');

}


export default [
    defaultSaga,

];
