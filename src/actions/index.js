import _ from 'lodash';
import { FETCH_RECIPES, EDIT_RECIPE } from './types';

export function fetchRecipes() {

    const data = {...localStorage}

    return {
        type: FETCH_RECIPES,
        payload: data
    };
}

export function editRecipes(index) {

    const   data = localStorage.getItem(index),
            parsedData = JSON.parse(data),
            id = { id: parseInt(index) },
            finalData = _.assign(id, parsedData);

    return {
        type: EDIT_RECIPE,
        payload: finalData
    };
}