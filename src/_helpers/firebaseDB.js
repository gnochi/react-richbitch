import firebase from 'firebase';
import {userActions} from '../_actions/userAction'
import {history} from './history';
import store from './store'
import {userConstants} from '../_constants/userConstants'
import {userService} from '../_services/userService';
import {alertActions} from "../_actions/alertActions"
import {prestigeActions} from "../_actions/prestigeAction"
import {connectivityActions} from "../_actions/connectivityActions";


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
firebase.auth().getRedirectResult()
    .then((result) => {

        if (result.user !== null ) {
            store.dispatch({type: 'LOADER_STOP'});


            let storeObj = store.getState();

            /**
             * Add Modal Helper for new User
             */
            if(result.additionalUserInfo.isNewUser){
                store.dispatch( {type: userConstants.ACTIVATE_HELPER_MODAL} );
            }


            userService.registerWithSocialLogin(result.user)
                .then(user => {

                        store.dispatch(connectivityActions.setConnectivity());

                        if(storeObj.connectivity.isOnline){
                            store.dispatch(userActions.updateAllUsers())
                        }

                        history.push('/home')
                    },
                    error => {
                        store.dispatch({type: userConstants.LOGIN_FAILURE});
                        store.dispatch(alertActions.error(error.message))
                    });

        } /*else {
            store.dispatch({type: 'LOADER_STOP'});
            let storeObj = store.getState();
            if(storeObj.auth.loggingIn){
                history.push('/')
            }else{
                history.push('/login')
            }

        }*/


    }).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;

        store.dispatch({type: 'LOADER_STOP'});
        store.dispatch({type: userConstants.LOGIN_FAILURE});
        store.dispatch(alertActions.error(error.message))

    });

/**
 * Called on User State changed
 */
firebase.auth().onAuthStateChanged((user) => {
    if (user.uid != null) {
        let storeObj = store.getState();
        store.dispatch(connectivityActions.setConnectivity());
        if(storeObj.connectivity.isOnline){
            store.dispatch(userActions.updateAllUsers())
        }
        history.push('/home')

    } else {
        console.log('user is signed out ', user)
        store.dispatch({type: userConstants.LOGOUT});
        //history.push('/login')
    }
});

/**
 * Listen to User changes on Firebase DB
 * @type {firebase.database.Reference}
 */
var ref = firebase.database().ref("users");
firebase.database().ref().on('value', (snapshot) => {

    let storeObj = store.getState();
    store.dispatch(connectivityActions.setConnectivity());
    if(storeObj.connectivity.isOnline){
        store.dispatch(userActions.updateAllUsers())
    }


});


export const updateLoaderMiddleware = store => next => action => {
    const {payment, auth, registration, unregister, user, userList} = store.getState();

    if(payment.fetching || auth.fetching || registration.fetching || unregister.fetching
        || user.fetching || userList.fetching){

    }
    next(action);
}

export const messaging = firebase.messaging();

messaging.onMessage(function(payload) {
    console.log('Message received. ', payload);
    store.dispatch(alertActions.success(payload.data.body))



});

messaging.onTokenRefresh(function() {
    messaging.getToken().then(function(refreshedToken) {
        // Todo handle refresh Token
        console.log('Token refreshed by firebase');
    }).catch(function(err) {
        console.log('Unable to retrieve refreshed token ', err);
    });
});



