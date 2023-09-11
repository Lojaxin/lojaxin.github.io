
import * as TYPES from '../action-types';

export const initialState = {
    userInfo: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload
            }
        default: return state

    }
}

export default reducer;