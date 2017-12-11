/* TODO: rewrite Reducer as in eample code */

import {userConstants} from "../_constants/userConstants";

export default function reducer(state = {
    id: null,
    username: null,
    firstname: null,
    lastname: null,
    email: null,
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch (action.type) {
        case userConstants.USER_UPDATE: {
            console.log('updating', action)
            return {
                ...state,
                username: action.user.username,
                firstname: action.user.firstname,
                lastname: action.user.lastname,
                email: action.user.email,
                fetching: true
            }
        }
        case 'FETCH_USERS_REJECTED': {
            return {...state, fetching: false, error: action.payload}
        }
        case 'FETCH_USERS_FULFILLED': {
            return {
                ...state,
                fetching: false,
                fetched: true,
                users: action.payload
            }
        }
    }
    return state;
}