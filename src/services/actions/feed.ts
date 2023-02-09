import { TFeedOrder } from './../reducers/feed';
import { getOrderById } from '../../utils/burger-api';
import { AppDispatch, AppThunk } from '../../utils/types';
import {
  WS_FEED_ORDERS_CONNECT,
  WS_USER_ORDERS_CONNECT,
  WS_FEED_RECEIVED_MESSAGE,
  WS_FEED_ORDERS_ERROR,
  WS_FEED_ORDERS_DISCONNECT,
  WS_USER_ORDERS_DISCONNECT,
  GET_ORDER
} from '../constants/feed';

export interface IWsAction {
  readonly type: string;
  payload?: any;
}

export interface IWsFeedOrdersConnect extends IWsAction {
  readonly type: typeof WS_FEED_ORDERS_CONNECT;
}
export interface IWsUserOrdersConnect extends IWsAction {
  readonly type: typeof WS_USER_ORDERS_CONNECT;
}
export interface IWsFeedReceivedMessage extends IWsAction {
  readonly type: typeof WS_FEED_RECEIVED_MESSAGE;
  orders: Array<TFeedOrder>;
  total: number;
  totalToday: number;
}
export interface IWsFeedOrdersError extends IWsAction {
  readonly type: typeof WS_FEED_ORDERS_ERROR;
}
export interface IWsFeedOrdersDisconnect extends IWsAction {
  readonly type: typeof WS_FEED_ORDERS_DISCONNECT;
}
export interface IWsUserOrdersDisconnect extends IWsAction {
  readonly type: typeof WS_USER_ORDERS_DISCONNECT;
}
export interface IGetOrder {
  readonly type: typeof GET_ORDER;
  order: TFeedOrder
}

export type TFeedActions = 
  IWsFeedOrdersConnect | 
  IWsUserOrdersConnect |
  IWsFeedReceivedMessage |
  IWsFeedOrdersError |
  IWsFeedOrdersDisconnect |
  IWsUserOrdersDisconnect |
  IGetOrder;

export const getOrderRequest = (id: string): AppThunk => (dispatch: AppDispatch) => {
  getOrderById(id).then(res => {
    if (res) {
      dispatch({ type: GET_ORDER, order: res[0] });
    }
  })
  .catch(error => {
    console.error(error);
  });
};