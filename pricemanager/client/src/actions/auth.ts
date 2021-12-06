import axios from 'axios';
import { Dispatch } from 'redux';
import store from '../store';
import { USER_LOADED, USER_LOADING } from './types';


// Check token & load user
export const loadUser = () => (dispatch: Dispatch) => {
    // user is loading
    dispatch({ type: USER_LOADING });

    // Get token from store
    const token = store.getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': ''
        }
    }

    // If token, add to headers config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    axios
        .get('/api/auth/user', config)
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err);
        });
}