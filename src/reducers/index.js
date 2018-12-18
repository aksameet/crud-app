import { combineReducers } from 'redux';
import RecipeReducer from './reducer_recipe';
import ActiveRecipeReduer from './reducer_active_recipe';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    recipes: RecipeReducer,
    activeRecipe: ActiveRecipeReduer,
    form: formReducer
});

export default rootReducer;
