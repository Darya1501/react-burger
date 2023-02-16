import { WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_ERROR, WS_FEED_CONNECTION_SUCCESS, WS_FEED_GET_MESSAGE  } from "../constants/feed"
import { feedReducer, initialFeedState as initialState } from "../reducers/feed"

describe('feed reducer', () => {

  test('should return the initial state', () => {
    expect(feedReducer(undefined, {})).toEqual(initialState)
  })

  test('should handle WS_FEED_CONNECTION_SUCCESS', () => {
    const expected = { ...initialState, wsConnected: true };
    const received = feedReducer(initialState, { type: WS_FEED_CONNECTION_SUCCESS });
    expect(received).toEqual(expected)
  });

  test('should handle WS_FEED_CONNECTION_ERROR', () => {
    const expected = { ...initialState, error: 'error', wsConnected: false };
    const received = feedReducer(initialState, { type: WS_FEED_CONNECTION_ERROR, payload: 'error' });
    expect(received).toEqual(expected)
  });

  test('should handle WS_FEED_CONNECTION_CLOSED', () => {
    const expected = { ...initialState, wsConnected: false };
    const received = feedReducer(initialState, { type: WS_FEED_CONNECTION_CLOSED });
    expect(received).toEqual(expected)
  });

  test('should handle WS_FEED_GET_MESSAGE', () => {
    const expected = { ...initialState, orders: [{ name: "Флюоресцентный бессмертный бургер" }], total: 1, totalToday: 1 };
    const received = feedReducer(initialState, { type: WS_FEED_GET_MESSAGE, orders: [{ name: "Флюоресцентный бессмертный бургер" }], total: 1, totalToday: 1 });
    expect(received).toEqual(expected)
  });

})