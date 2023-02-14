import {
  POST_ORDER_FAILED,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  TOGGLE_ORDER_DATA
} from '../constants/order';
import { orderReducer, initialOrderState as initialState } from '../reducers/order';

const order = {
  number: '123'
}

describe('order reducer', () => {

  test('are you working?', () => {
    expect(true).toBe(true)
  })

  test('should return the initial state', () => {
    expect(orderReducer(undefined, {})).toEqual(initialState)
  })
  
  test('should handle POST_ORDER_REQUEST', () => {
    const expected = { ...initialState, orderRequest: true };
    const received = orderReducer(initialState, { type: POST_ORDER_REQUEST });
    expect(received).toEqual(expected)
  });

  test('should handle POST_ORDER_SUCCESS', () => {
    const expected = { 
      ...initialState,
      orderRequest: false,
      orderFailed: false,
      order: order
    };
    const received = orderReducer(initialState, { type: POST_ORDER_SUCCESS, order: order });
    expect(received).toEqual(expected)
  });

  test('should handle POST_ORDER_FAILED', () => {
    const expected = { 
      ...initialState,
      orderFailed: true,
      orderRequest: false
    };
    const received = orderReducer(initialState, { type: POST_ORDER_FAILED });
    expect(received).toEqual(expected)
  });

  test('should handle TOGGLE_ORDER_DATA with open modal', () => {
    const stateWithOpenModal = {
      ...initialState, 
      isOrderModalVisible: true
    }
    const expected = { 
      ...initialState,
      isOrderModalVisible: false
    };
    const received = orderReducer(stateWithOpenModal, { type: TOGGLE_ORDER_DATA });
    expect(received).toEqual(expected)
  });

  test('should handle TOGGLE_ORDER_DATA with closed modal', () => {
    const stateWithClosedModal = {
      ...initialState, 
      isOrderModalVisible: false
    }
    const expected = { 
      ...initialState,
      isOrderModalVisible: true
    };
    const received = orderReducer(stateWithClosedModal, { type: TOGGLE_ORDER_DATA });
    expect(received).toEqual(expected)
  });



})