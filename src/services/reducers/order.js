import {
  POST_ORDER_FAILED,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  TOGGLE_ORDER_DATA
} from '../actions/order';

const initialOrderState = {
  orderRequest: true,
  orderFailed: false,
  order: null,
  isOrderModalVisible: false,
}

export const orderReducer = (state = initialOrderState, action) => {
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
      }
    }
    default: {
      return state;
    }
  }
}