import * as types from 'constants/types';

import axios from 'axios';
import { API } from 'constants/config';


export const getUser = () => async (dispatch) => {

    dispatch({ type: types.GET_USER_START });

    try {
        const data = await axios.get(`${API}/user`);
        const user = data.data;

        dispatch({ type: types.GET_USER_SUCCESS, payload: user });

    } catch (error) {
        dispatch({ type: types.GET_USER_ERROR, payload: error });
    }
};
