import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from "./reducers/ingredients";
import { constructorReducer } from "./reducers/constructor";
import { orderReducer } from "./reducers/order";
import { userReducer } from "./reducers/user";
import { feedReducer } from "./reducers/feed";
import { socketMiddleware } from "./socket-middleware";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructors: constructorReducer,
  order: orderReducer,
  user: userReducer,
  feed: feedReducer
});

export const store = configureStore({ 
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware('wss://norma.nomoreparties.space/orders')),
  devTools: process.env.NODE_ENV !== 'production'
})