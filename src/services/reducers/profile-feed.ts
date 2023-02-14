import { TFeedOrder } from "../../utils/types"
import { TProfileFeedActions } from "../actions/profile-feed"
import { 
  WS_PROFILE_FEED_CONNECTION_SUCCESS,
  WS_PROFILE_FEED_CONNECTION_ERROR,
  WS_PROFILE_FEED_GET_MESSAGE,
  WS_PROFILE_FEED_CONNECTION_CLOSED
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

export const profileFeedReducer = (state = initialFeedState, action: TProfileFeedActions) => {
  switch (action.type) {
    case WS_PROFILE_FEED_CONNECTION_SUCCESS:
			return {
				...state,
				wsConnected: true
			};
		case WS_PROFILE_FEED_CONNECTION_ERROR:
			return {
				...state,
				error: action.payload,
				wsConnected: false
			};
		case WS_PROFILE_FEED_CONNECTION_CLOSED:
			return {
				...state,
				wsConnected: false
			};
		case WS_PROFILE_FEED_GET_MESSAGE:
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