import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppDispatch, RootState } from '../utils/types';

import { TFeedActions } from './actions/feed';
import { 
  WS_FEED_ORDERS_CONNECT,
  WS_FEED_ORDERS_DISCONNECT,
  WS_FEED_ORDERS_ERROR,
  WS_FEED_RECEIVED_MESSAGE
} from './constants/feed';

export const socketMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TFeedActions) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === WS_FEED_ORDERS_CONNECT) {
        socket = new WebSocket(wsUrl);
      }
      
      if (socket) {
        socket.onopen = event => {
          console.log('open');
        };

        socket.onerror = event => {
          console.log('error');
          dispatch({ type: WS_FEED_ORDERS_ERROR });
        };

        socket.onmessage = event => {
          console.log('message');
          const { data } = event;
          const { orders, total, totalToday } = JSON.parse(data)
          dispatch({ type: WS_FEED_RECEIVED_MESSAGE, orders, total, totalToday });
        };

        socket.onclose = event => {
          console.log('close');
          dispatch({ type: WS_FEED_ORDERS_DISCONNECT });
        };

        if (type === WS_FEED_ORDERS_DISCONNECT) {
          socket.close(1000);
        }
      }

      next(action);
    };
  }) as Middleware;
};