import { combineReducers } from "redux";
import { ingredientsReducer, modalReducer, orderReducer } from "./reducers";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  modal: modalReducer,
  order: orderReducer
});