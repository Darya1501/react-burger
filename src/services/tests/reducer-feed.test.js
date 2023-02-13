import { WS_FEED_ORDERS_CONNECT, WS_FEED_ORDERS_DISCONNECT, WS_FEED_ORDERS_ERROR, WS_FEED_RECEIVED_MESSAGE, WS_USER_ORDERS_CONNECT, WS_USER_ORDERS_DISCONNECT  } from "../constants/feed"
import { feedReducer } from "../reducers/feed"

const initialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
}

describe('feed reducer', () => {

  test('should return the initial state', () => {
    expect(feedReducer(undefined, {})).toEqual(initialState)
  })

  test('should handle WS_FEED_ORDERS_CONNECT', () => {
    const expected = { ...initialState, wsConnected: true };
    const received = feedReducer(initialState, { type: WS_FEED_ORDERS_CONNECT });
    expect(received).toEqual(expected)
  });

  test('should handle WS_USER_ORDERS_CONNECT', () => {
    const expected = { ...initialState, wsConnected: true };
    const received = feedReducer(initialState, { type: WS_USER_ORDERS_CONNECT });
    expect(received).toEqual(expected)
  });

  test('should handle WS_FEED_ORDERS_ERROR', () => {
    const expected = { ...initialState };
    const received = feedReducer(initialState, { type: WS_FEED_ORDERS_ERROR });
    expect(received).toEqual(expected)
  });

  test('should handle WS_FEED_ORDERS_DISCONNECT', () => {
    const expected = { ...initialState };
    const received = feedReducer(initialState, { type: WS_FEED_ORDERS_DISCONNECT });
    expect(received).toEqual(expected)
  });

  test('should handle WS_USER_ORDERS_DISCONNECT', () => {
    const expected = { ...initialState };
    const received = feedReducer(initialState, { type: WS_USER_ORDERS_DISCONNECT });
    expect(received).toEqual(expected)
  });

  test('should handle WS_FEED_RECEIVED_MESSAGE', () => {
    const expected = { ...initialState, orders: [{ name: "Флюоресцентный бессмертный бургер" }], total: 1, totalToday: 1 };
    const received = feedReducer(initialState, { type: WS_FEED_RECEIVED_MESSAGE, orders: [{ name: "Флюоресцентный бессмертный бургер" }], total: 1, totalToday: 1 });
    expect(received).toEqual(expected)
  });

})