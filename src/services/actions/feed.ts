import { PayloadAction } from '@reduxjs/toolkit';
import { TFeedOrder } from '../../utils/types';

import { 
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_GET_MESSAGE,
  WS_FEED_SEND_MESSAGE,
  WS_FEED_CONNECTION_CLOSE,
  WS_FEED_CONNECTION_CLOSED
} from '../constants/feed';

export const wsFeedActions = {
  wsInit: WS_FEED_CONNECTION_START,
  onOpen: WS_FEED_CONNECTION_SUCCESS,
  onError: WS_FEED_CONNECTION_ERROR,
  onMessage: WS_FEED_GET_MESSAGE,
  wsSendMessage: WS_FEED_SEND_MESSAGE,
  wsClose: WS_FEED_CONNECTION_CLOSE,
  onClose: WS_FEED_CONNECTION_CLOSED,
};

export interface IWsAction {
  readonly type: string;
  payload?: any;
}

export interface IWsFeedConnectionStart extends IWsAction {
  readonly type: typeof WS_FEED_CONNECTION_START
}
export interface IWsFeedConnectionSuccess extends IWsAction {
  readonly type: typeof WS_FEED_CONNECTION_SUCCESS,
  payload: PayloadAction
}
export interface IWsFeedConnectionError extends IWsAction {
  readonly type: typeof WS_FEED_CONNECTION_ERROR,
  payload: PayloadAction
}
export interface IWsFeedGetMessage extends IWsAction {
  readonly type: typeof WS_FEED_GET_MESSAGE,
  orders: Array<TFeedOrder>,
  total: number,
  totalToday: number
}
export interface IWsFeedSendMessage extends IWsAction {
  readonly type: typeof WS_FEED_SEND_MESSAGE
}
export interface IWsFeedConnectionClose extends IWsAction {
  readonly type: typeof WS_FEED_CONNECTION_CLOSE
}
export interface IWsFeedConnectionClosed extends IWsAction {
  readonly type: typeof WS_FEED_CONNECTION_CLOSED,
  payload: PayloadAction
}

export type TFeedActions = 
IWsFeedConnectionStart |
IWsFeedConnectionSuccess |
IWsFeedConnectionError |
IWsFeedGetMessage |
IWsFeedSendMessage |
IWsFeedConnectionClose |
IWsFeedConnectionClosed;

