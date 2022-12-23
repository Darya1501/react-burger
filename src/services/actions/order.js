import { postOrder } from "../../utils/burger-api";

// Получение номера заказа в модальном окне
export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';
export const GET_ORDER_NUMBER = 'GET_ORDER_NUMBER';
export const TOGGLE_ORDER_DATA = 'TOGGLE_ORDER_DATA';

export function getOrderNumber(components) {
  return function(dispatch) {
    dispatch({ type: POST_ORDER_REQUEST });
    dispatch({ type: TOGGLE_ORDER_DATA });

    postOrder(components).then(id => {
      if(id) {
        dispatch({
          type: POST_ORDER_SUCCESS,
          order: {
            id: id,
            ...components
          }
        })
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
}