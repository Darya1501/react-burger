import { WS_PROFILE_FEED_CONNECTION_SUCCESS, WS_PROFILE_FEED_CONNECTION_ERROR, WS_PROFILE_FEED_GET_MESSAGE, WS_PROFILE_FEED_CONNECTION_CLOSED  } from "../constants/feed"
import { profileFeedReducer, initialFeedState as initialState } from "../reducers/profile-feed"

describe('profile feed reducer', () => {

  test('should return the initial state', () => {
    expect(profileFeedReducer(undefined, {})).toEqual(initialState)
  })

  test('should handle WS_PROFILE_FEED_CONNECTION_SUCCESS', () => {
    const expected = { ...initialState, wsConnected: true };
    const received = profileFeedReducer(initialState, { type: WS_PROFILE_FEED_CONNECTION_SUCCESS });
    expect(received).toEqual(expected)
  });

  test('should handle WS_PROFILE_FEED_CONNECTION_ERROR', () => {
    const expected = { ...initialState, error: 'error', wsConnected: false };
    const received = profileFeedReducer(initialState, { type: WS_PROFILE_FEED_CONNECTION_ERROR, payload: 'error' });
    expect(received).toEqual(expected)
  });

  test('should handle WS_PROFILE_FEED_CONNECTION_CLOSED', () => {
    const expected = { ...initialState, wsConnected: false };
    const received = profileFeedReducer(initialState, { type: WS_PROFILE_FEED_CONNECTION_CLOSED });
    expect(received).toEqual(expected)
  });

  test('should handle WS_PROFILE_FEED_GET_MESSAGE', () => {
    const expected = { ...initialState, orders: [{ name: "Флюоресцентный бессмертный бургер" }], total: 1, totalToday: 1 };
    const received = profileFeedReducer(initialState, { type: WS_PROFILE_FEED_GET_MESSAGE, orders: [{ name: "Флюоресцентный бессмертный бургер" }], total: 1, totalToday: 1 });
    expect(received).toEqual(expected)
  });

})