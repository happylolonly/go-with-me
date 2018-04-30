import * as types from 'constants/types';

const initialState = {
    isLoading: false,
    data: {},
    error: null
};

export default function userReducer(state = initialState, action) {

    switch (action.type) {
        case types.GET_USER_START:
            return { ...state, isLoading: true };

        case types.GET_USER_SUCCESS:
            return { ...state, data: action.payload, isLoading: false };

        case types.GET_USER_ERROR:
            return { ...state, error: action.payload, isLoading: false };

        default:
            return state;

    }

}
