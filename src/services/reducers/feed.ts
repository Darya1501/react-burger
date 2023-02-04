import { TFeedActions } from "../actions/feed"
import { WS_FEED_ORDERS_CONNECT, WS_FEED_ORDERS_DISCONNECT, WS_FEED_ORDERS_ERROR, WS_FEED_RECEIVED_MESSAGE } from "../constants/feed"

export type TFeedOrder = {
  ingredients: Array<string>,
  _id: string,
  name: string,
  status: string,
  number: number,
  createdAt: string,
  updatedAt: string
}

type TInitialState = {
  wsConnected: boolean,
  orders: Array<TFeedOrder>,
  total: number,
  totalToday: number
}

const initialState: TInitialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0
}

export const feedReducer = (state = initialState, action: TFeedActions) => {
  switch (action.type) {
    case WS_FEED_ORDERS_CONNECT:
      return { ...state, wsConnected: true }

    case WS_FEED_RECEIVED_MESSAGE:
      return { ...state, orders: action.orders, total: action.total, totalToday: action.totalToday };

    case WS_FEED_ORDERS_ERROR:
      return { ...state, wsConnected: false };

    case WS_FEED_ORDERS_DISCONNECT:
      return { ...initialState };

    default:
      return state;
}
}