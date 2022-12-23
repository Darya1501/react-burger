import { combineReducers } from "redux";
import { ingredientsReducer } from "./reducers/ingredients";
import { constructorReducer } from "./reducers/constructor";
import { orderReducer } from "./reducers/order";
import { modalReducer } from "./reducers/modal";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructors: constructorReducer,
  modal: modalReducer,
  order: orderReducer
});