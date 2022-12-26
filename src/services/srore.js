import { combineReducers } from "redux";
import { ingredientsReducer } from "./reducers/ingredients";
import { constructorReducer } from "./reducers/constructor";
import { orderReducer } from "./reducers/order";
import { modalReducer } from "./reducers/modal";
import { userReducer } from "./reducers/user";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructors: constructorReducer,
  modal: modalReducer,
  order: orderReducer,
  user: userReducer
});