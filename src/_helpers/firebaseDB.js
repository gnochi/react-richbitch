import firebase from 'firebase';
import {userActions} from '../_actions/userAction'
import {history} from './history';
import store from './store'
import {userConstants} from '../_constants/userConstants'
import {userService} from '../_services/userService';
import {alertActions} from "../_actions/alertActions"

const firebaseConfig = {
    apiKey: "AIzaSyA2kuyJIWakmM8x7S08ERWhj5O3WolPdGU",
    authDomain: "richbitch-4fc7a.firebaseapp.com",
    databaseURL: "https://richbitch-4fc7a.firebaseio.com",
    projectId: "richbitch-4fc7a",
    storageBucket: "richbitch-4fc7a.appspot.com",
    messagingSenderId: "964894129974"
};


firebase.initializeApp(firebaseConfig);

/**
 * Result of Social Media Register / Login Request
 */
firebase.auth().getRedirectResult().then((result) => {

    console.log('Called Get Redirect result ', result)

    if (result.user || firebase.auth().currentUser) {
        store.dispatch({type: 'LOADER_STOP'});

        userService.registerWithSocialLogin(result.user)
            .then(user => {
                    //store.dispatch({type: userConstants.LOGIN_SUCCESS});
                    history.push('/')
                },
                error => {
                    store.dispatch({type: userConstants.LOGIN_FAILURE});
                    store.dispatch(alertActions.error(error.message))
                });

    } else {
        store.dispatch({type: 'LOADER_STOP'});
        history.push('/')
    }


    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        store.dispatch({type: 'LOADER_STOP'});
        store.dispatch({type: userConstants.LOGIN_FAILURE});
        store.dispatch(alertActions.error(error.message))

    });

firebase.auth().onAuthStateChanged((user) => {
    console.log('Called on auth State changed');

    if (user) {
        store.dispatch(userActions.update());
        store.dispatch({type: userConstants.LOGIN_SUCCESS});

    } else {
        // No user is signed in.
        console.log('user is signed out ', user)
        store.dispatch({type: userConstants.LOGOUT});
        history.push('/login')
    }

});


export const updateLoaderMiddleware = store => next => action => {
    const {payment, auth, registration, unregister, user, userList} = store.getState();

    if(payment.fetching || auth.fetching || registration.fetching || unregister.fetching
        || user.fetching || userList.fetching){

    }
    next(action);
}

