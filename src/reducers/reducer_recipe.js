import { ADD_RECIPES } from '../actions/types';

export default function(state = [], action) {
    console.log(action.payload)
    switch (action.type) {
        case ADD_RECIPES:
            return [...state, action.payload];
        default:
            return state;
    }
}
