import { combineReducers } from 'redux';
import RecipeReducer from './reducer_recipe';
import ActiveRecipeReduer from './reducer_active_recipe';

const rootReducer = combineReducers({
    recipes: RecipeReducer,
    activeRecipe: ActiveRecipeReduer
});

export default rootReducer;
