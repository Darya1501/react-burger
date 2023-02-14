import { TFeedOrder, TOrder } from '../../utils/types';
import { TOrderActions } from '../actions/order';
import {
  GET_ORDER,
  POST_ORDER_FAILED,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  TOGGLE_ORDER_DATA
} from '../constants/order';


type TOrderState = {
  orderRequest: boolean,
  orderFailed: boolean,
  order: TOrder | null,
  isOrderModalVisible: boolean,
  feedOrder: TFeedOrder | null
}

export const initialOrderState: TOrderState = {
  orderRequest: true,
  orderFailed: false,
  order: null,
  isOrderModalVisible: false,
  feedOrder: null
}

export const orderReducer = (state = initialOrderState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      };
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        order: action.order
      };
    }
    case POST_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    case TOGGLE_ORDER_DATA: {
      return {
        ...state,
        isOrderModalVisible: !state.isOrderModalVisible,
      };
    }
    case GET_ORDER: {
      return { ...state, feedOrder: action.order };
    }
    default: {
      return state;
    }
  }
}