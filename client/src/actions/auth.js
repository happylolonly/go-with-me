import * as types from 'constants/types';

import axios from 'axios';
import { API } from 'constants/config';
import { browserHistory } from 'react-router';


export const auth = () => async (dispatch) => {

    dispatch({ type: types.GET_AUTH_START });

    try {
        const data = await axios.get(`${API}/auth`);
        const auth = data.data;

        dispatch({ type: types.GET_AUTH_SUCCESS, payload: auth });
        auth && browserHistory.push('/dashboard');
    } catch (error) {
        dispatch({ type: types.GET_AUTH_ERROR, payload: error });
    }
};


export const logout = () => async (dispatch) => {

    dispatch({ type: types.LOGOUT_START });

    try {
        await axios.get(`${API}/logout`);
        window.location = '/';

        // const auth = data.data;

        // dispatch({ type: types.LOGOUT_SUCCESS, payload: auth });
        // auth && browserHistory.push('/dashboard');
    } catch (error) {
        // dispatch({ type: types.LOGOUT_ERROR, payload: error });
    }
};

