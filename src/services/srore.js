import { combineReducers } from "redux";
import { ingredientsReducer, modalReducer } from "./reducers";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  modal: modalReducer
});