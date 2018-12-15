import { ADD_RECIPES } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case ADD_RECIPES:
            return [...state, action.payload];
        default:
            return state;
    }
}
