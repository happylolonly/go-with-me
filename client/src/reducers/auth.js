import * as types from 'constants/types';

const initialState = {
    authorized: false,
};

export default function authReducer(state = initialState, action) {

    switch (action.type) {
        case types.GET_AUTH_START:
            return state;

        case types.GET_AUTH_SUCCESS:
            return { ...state, authorized: action.payload };

        case types.GET_AUTH_ERROR:
            return state;

        default:
            return state;

    }

}
