import _ from "lodash";
import { FETCH_RECIPES } from './types';

export function fetchRecipes() {

    const data = {...localStorage}

    return {
        type: FETCH_RECIPES,
        payload: data
    };
}