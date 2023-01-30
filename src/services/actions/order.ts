import { postOrder } from "../../utils/burger-api";
import { AppDispatch, AppThunk, TOrder } from "../../utils/types";
import { CLEAR_CONSTRUCTOR } from "../constants/constructor";

import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  TOGGLE_ORDER_DATA,
} from '../constants/order';

export interface IPostOrderRequest {
  readonly type: typeof POST_ORDER_REQUEST;
}
export interface IPostOrderSuccess {
  readonly type: typeof POST_ORDER_SUCCESS;
  order: TOrder
}
export interface IPostOrderFailed {
  readonly type: typeof POST_ORDER_FAILED;
}
export interface IToggleOrderData {
  readonly type: typeof TOGGLE_ORDER_DATA;
}
export type TOrderActions = 
  IPostOrderRequest |
  IPostOrderSuccess |
  IPostOrderFailed |
  IToggleOrderData;

export const getOrderNumber: AppThunk = (components: Array<string>) => (dispatch: AppDispatch) => {
  dispatch({ type: POST_ORDER_REQUEST });
  dispatch({ type: TOGGLE_ORDER_DATA });

  postOrder(components).then(id => {
    if(id) {
      dispatch({
        type: POST_ORDER_SUCCESS,
        order: {
          id: id,
          components: components
        }
      })
      dispatch({ type: CLEAR_CONSTRUCTOR })
    } else {
      dispatch({
        type: POST_ORDER_FAILED
      });
    }
  })
  .catch(error => {
    console.error(error);
    dispatch({
      type: POST_ORDER_FAILED
    });
  });
}
