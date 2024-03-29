import { TFeedOrder } from "../../utils/types"
import { TFeedActions } from "../actions/feed"
import { 
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_GET_MESSAGE,
  WS_FEED_CONNECTION_CLOSED
} from "../constants/feed"


type TInitialState = {
  wsConnected: boolean,
  orders: Array<TFeedOrder>,
  total: number,
  totalToday: number,
  order?: TFeedOrder
}

export const initialFeedState: TInitialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
}

export const feedReducer = (state = initialFeedState, action: TFeedActions) => {
  switch (action.type) {
    case WS_FEED_CONNECTION_SUCCESS:
			return {
				...state,
				wsConnected: true
			};
		case WS_FEED_CONNECTION_ERROR:
			return {
				...state,
				error: action.payload,
				wsConnected: false
			};
		case WS_FEED_CONNECTION_CLOSED:
			return {
				...state,
				wsConnected: false
			};
		case WS_FEED_GET_MESSAGE:
			return {
				...state,
				orders: action.orders,
				total: action.total,
				totalToday: action.totalToday
			};
    default:
      return state;
  }
}