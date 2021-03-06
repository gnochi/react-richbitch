import {pushConstants} from '../_constants/pushConstants';
import {pushService} from '../_services/pushService'
import {alertActions} from "./alertActions";
import firebase from 'firebase';
import {userConstants} from "../_constants/userConstants";

export const pushActions = {
    subscribePushNotifications,
    unsubscribePushNotifications
};

function subscribePushNotifications() {
    return dispatch => {
        dispatch(requestPermission());

        // Request Permission
        pushService.requestPermission()
            .then(() => {
                dispatch(successPermission());
                dispatch(requestSubscription());

                // Subscribe User for Push
                let user = firebase.auth().currentUser;

                pushService.subscribe(user.uid)
                    .then((currentToken) => {
                        // ToDo Store Token to
                        dispatch(updatePushToken(currentToken))
                        dispatch(successSubscription());
                        dispatch(alertActions.success('Successfully subscribed'));

                    }).catch((err) => {
                        dispatch(failureSubscription(err))
                        dispatch(alertActions.error(err.message))

                })


            }).catch((err) => {
                dispatch(failurePermission());
                dispatch(alertActions.error(err.message))
        });


    }

    function requestPermission() {
        return {type: pushConstants.PUSH_PERMISSION_REQUEST}
    }
    function successPermission() {
        return {type: pushConstants.PUSH_PERMISSION_SUCCESS}
    }
    function failurePermission(err) {
        return {type: pushConstants.PUSH_PERMISSION_FAILURE, err}
    }

    function requestSubscription() {
        return {type: pushConstants.PUSH_SUBSCRIPTION_REQUEST}
    }

    function successSubscription() {
        return {type: pushConstants.PUSH_SUBSCRIPTION_SUCCESS}
    }

    function updatePushToken(pushToken) {
        return {type: userConstants.PUSH_TOKEN_SUBSCRIBE, pushToken}

    }

    function failureSubscription(error) {
        return {type: pushConstants.PUSH_SUBSCRIPTION_FAILURE, error}
    }
}

function unsubscribePushNotifications() {
    return dispatch => {
        dispatch(requestUnsubscription());
        // Check if Permission is Allowed
        let user = firebase.auth().currentUser;

        pushService.unsubscribe(user.uid)
            .then(() => {
                dispatch(successUnsubscription());
                dispatch(unsubscribePushToken());
                dispatch(alertActions.success('Successfully unsubscribed'));


            }).catch((err) => {
                dispatch(failureUnsubscription(err));
                dispatch(alertActions.error(err.message))
        });


    }

    function requestUnsubscription() {
        return {type: pushConstants.PUSH_UNSUBSCRIPTION_REQUEST}
    }

    function successUnsubscription() {
        return {type: pushConstants.PUSH_UNSUBSCRIPTION_SUCCESS}
    }

    function unsubscribePushToken() {
        return {type: userConstants.PUSH_TOKEN_UNSUBSCRIBE}
    }

    function failureUnsubscription(error) {
        return {type: pushConstants.PUSH_UNSUBSCRIPTION_FAILURE, error}
    }
}

function checkPushToken() {
    return dispatch => {
        // Check if Permission is Allowed
        let user = firebase.auth().currentUser;

        pushService.check(user.uid)
            .then(() => {
                dispatch(successUnsubscription());
                dispatch(alertActions.success('Successfully unsubscribed'));


            }).catch((err) => {
            dispatch(failureUnsubscription(err));
            dispatch(alertActions.error(err.message))
        });


    }

    function requestUnsubscription() {
        return {type: pushConstants.PUSH_UNSUBSCRIPTION_REQUEST}
    }

    function successUnsubscription() {
        return {type: pushConstants.PUSH_UNSUBSCRIPTION_SUCCESS}
    }

    function failureUnsubscription(error) {
        return {type: pushConstants.PUSH_UNSUBSCRIPTION_FAILURE, error}
    }
}

