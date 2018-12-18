import { FETCH_RECIPES } from '../actions/types';

export default function(state = [], action) {

    switch (action.type) {
        case FETCH_RECIPES:
            return action.payload;
        default:
            return state;
    }
}
