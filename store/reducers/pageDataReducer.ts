
import * as TYPES from '../action-types';

export const initialState = {
    mdDocs: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SET_MD_DOCS:
            return {
                ...state,
                mdDocs: action.payload
            }
        default: return state

    }
}

export default reducer;