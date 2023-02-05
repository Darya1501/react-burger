import type { Middleware, MiddlewareAPI } from 'redux';
import { updateToken } from '../utils/burger-api';
import { getCookie } from '../utils/cookies';
import type { AppDispatch, RootState } from '../utils/types';

import { TFeedActions } from './actions/feed';
import { 
  WS_FEED_ORDERS_CONNECT,
  WS_FEED_ORDERS_DISCONNECT,
  WS_FEED_ORDERS_ERROR,
  WS_FEED_RECEIVED_MESSAGE,
  WS_USER_ORDERS_CONNECT,
  WS_USER_ORDERS_DISCONNECT
} from './constants/feed';

export const socketMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => async (action: TFeedActions) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === WS_FEED_ORDERS_CONNECT) {
        socket = new WebSocket(`${wsUrl}/all`);
      } else if (type === WS_USER_ORDERS_CONNECT) {
        const token = getCookie('accessToken');
          if (token) {
            socket = new WebSocket(`${wsUrl}?token=${token}`);
          } else {
            await updateToken()
            console.log('Нет доступа');
          }
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
          console.log('event: ', event);
          if (event.wasClean){
            dispatch({ type: WS_FEED_ORDERS_DISCONNECT });
            console.log('Соединение закрыто корректно');
            console.log(`Код закрытия - ${event.code}`);
            console.log(`Причина закрытия - ${event.reason}`)
          } else {
            console.log(`Соединение закрыто с кодом -  ${event.code}`);
          }
        };

        if (type === WS_FEED_ORDERS_DISCONNECT) {
          socket.close(1000);
        }

        if (type === WS_USER_ORDERS_DISCONNECT) {
          socket.close(1000);
        }
      }

      next(action);
    };
  }) as Middleware;
};