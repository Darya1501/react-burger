import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from "./reducers/ingredients";
import { constructorReducer } from "./reducers/constructor";
import { orderReducer } from "./reducers/order";
import { userReducer } from "./reducers/user";
import { feedReducer } from "./reducers/feed";
import { socketMiddleware } from "./socket-middleware";
import { wsFeedActions } from "./actions/feed";
import { wsProfileFeedActions } from "./actions/profile-feed";
import { profileFeedReducer } from "./reducers/profile-feed";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructors: constructorReducer,
  order: orderReducer,
  user: userReducer,
  feed: feedReducer,
  profileFeed: profileFeedReducer
});

export const store = configureStore({ 
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(socketMiddleware(wsFeedActions, false))
    .concat(socketMiddleware(wsProfileFeedActions, true)),
  devTools: process.env.NODE_ENV !== 'production'
})