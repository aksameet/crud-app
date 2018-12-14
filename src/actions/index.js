import { ADD_RECIPES } from './types';

export function addRecipe(recipe) {
    return {
        type: ADD_RECIPES,
        payload: recipe
    };
}