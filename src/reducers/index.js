import { combineReducers } from "redux";
import RecipeReducer from "./reducer_recipe";

const rootReducer = combineReducers({
    recipes: RecipeReducer
});

export default rootReducer;
