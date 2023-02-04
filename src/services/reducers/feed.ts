import { TFeedActions } from "../actions/feed"
import { GET_ORDER, WS_FEED_ORDERS_CONNECT, WS_FEED_ORDERS_DISCONNECT, WS_FEED_ORDERS_ERROR, WS_FEED_RECEIVED_MESSAGE, WS_USER_ORDERS_CONNECT, WS_USER_ORDERS_DISCONNECT } from "../constants/feed"

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
  totalToday: number,
  order?: TFeedOrder
}

const initialState: TInitialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
}

export const feedReducer = (state = initialState, action: TFeedActions) => {
  switch (action.type) {
    case WS_FEED_ORDERS_CONNECT:
      return { ...state, wsConnected: true }

    case WS_USER_ORDERS_CONNECT:
      return { ...state, wsConnected: true }

    case WS_FEED_RECEIVED_MESSAGE:
      return { ...state, orders: action.orders, total: action.total, totalToday: action.totalToday };

    case WS_FEED_ORDERS_ERROR:
      return { ...state, wsConnected: false };

    case WS_FEED_ORDERS_DISCONNECT:
      return { ...initialState };

    case WS_USER_ORDERS_DISCONNECT:
      return { ...initialState };

    case GET_ORDER:
      return { ...state, order: action.order };

    default:
      return state;
  }
}