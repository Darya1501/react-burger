import type { AnyAction, Middleware } from 'redux';
// import { updateToken } from '../utils/burger-api';
import { getCookie } from '../utils/cookies';
import type { TWSActions } from '../utils/types';

export const socketMiddleware = (wsActions: TWSActions, auth: boolean): Middleware => {
  return ((store) => {
    let socket: WebSocket | null = null;
    let connected = false;
    let url: string;

    return next => async (action: AnyAction) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsClose, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      const token = auth ? getCookie('accessToken') : null;

      if (type === wsInit) {
        connected = true;
        url = action.payload
        socket = new WebSocket(`${payload}${token ? '?token=' + token : ''}`);

        socket.onopen = event => {
          console.log('open');
          dispatch({ type: onOpen })
        };

        socket.onerror = event => {
          console.log('error');
          dispatch({ type: onError });
        };

        socket.onmessage = event => {
          console.log('message');
          const { data } = event;
          const { orders, total, totalToday } = JSON.parse(data)
          dispatch({ type: onMessage, orders, total, totalToday });
        };

        socket.onclose = event => {
          dispatch({ type: onClose });
          console.log('socket closed with code: ', event.code);
          if (!connected) {
            setTimeout(() => { dispatch({ type: wsInit, url }) }, 1000)
          }
        };

        if (wsClose && type === wsClose && socket) {
          socket.close(1000, 'socket closed');
          connected = false;
        }

        if (wsSendMessage && type === wsSendMessage && socket) {
          const message = token ? { ...payload, token } : { ...payload };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};