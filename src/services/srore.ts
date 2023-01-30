import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from "./reducers/ingredients";
import { constructorReducer } from "./reducers/constructor";
import { orderReducer } from "./reducers/order";
import { userReducer } from "./reducers/user";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructors: constructorReducer,
  order: orderReducer,
  user: userReducer
});

export const store = configureStore({ 
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
})