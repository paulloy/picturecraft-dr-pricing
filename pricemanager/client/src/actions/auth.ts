import axios from 'axios';
import { Dispatch } from 'redux';
import store from '../store';
import { createMessage } from './messages';
import { LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT_SUCCESS, USER_LOADED, USER_LOADING } from './types';


// Check token & load user
export const loadUser = () => (dispatch: Dispatch) => {
    // user is loading
    dispatch({ type: USER_LOADING });

    // Get token from store
    const token = store.getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If token, add to headers config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    axios
        .get('/api/auth/user', config)
        .then(res => {
            if (res.data.id === null) {
                throw 'failed to authenticate user';
            } else {
                dispatch({
                    type: USER_LOADED,
                    payload: res.data
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
}

// Login User
export const loginUser = (username: string, password: string) => (dispatch: Dispatch) => {
    // user is loading
    dispatch({ type: USER_LOADING });

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({ username, password });

    axios
        .post('/api/auth/login', body, config)
        .then(res => {
            if (res.data.id === null) {
                throw 'failed to authenticate user';
            } else {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                });
            }
        })
        .catch(err => {
            dispatch(createMessage({ error: 'Login Failed' }));
            dispatch({
                type: LOGIN_FAILED
            });
        });
}

// Logout User
export const logoutUser = () => (dispatch: Dispatch) => {

    // Get token from store
    const token = store.getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If token, add to headers config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    axios
        .post('/api/auth/logout/', null, config)
        .then(res => {
            if (res.data.id === null) {
                throw 'failed to authenticate user';
            } else {
                dispatch({
                    type: LOGOUT_SUCCESS
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
}