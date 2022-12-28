import { combineReducers } from "redux";
import { ingredientsReducer } from "./reducers/ingredients";
import { constructorReducer } from "./reducers/constructor";
import { orderReducer } from "./reducers/order";
import { userReducer } from "./reducers/user";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructors: constructorReducer,
  order: orderReducer,
  user: userReducer
});