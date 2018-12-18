import { EDIT_RECIPE } from '../actions/types';

export default function(state = null, action) {

    switch (action.type) {
        case EDIT_RECIPE:
            return action.payload;
        default:
            return state;
    }
}