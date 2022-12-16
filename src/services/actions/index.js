import { getIngredients, postOrder } from "../../utils/burger-api";

// Получение списка ингредиентов от API
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

// Работа с конструктором бургера
export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT';
export const REMOVE_CONSTRUCTOR_INGREDIENT = 'REMOVE_CONSTRUCTOR_INGREDIENT';
export const MOVE_CONSTRUCTOR_INGREDIENT = 'MOVE_CONSTRUCTOR_INGREDIENT';
export const CHANGE_CONSTRUCTOR_BUN = 'CHANGE_CONSTRUCTOR_BUN';

// Просмотр ингредиента в модальном окне
export const SHOW_INGREDIENT_DATA = 'SHOW_INGREDIENT_DATA';
export const HIDE_INGREDIENT_DATA = 'HIDE_INGREDIENT_DATA';

// Получение номера заказа в модальном окне
export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';
export const GET_ORDER_NUMBER = 'GET_ORDER_NUMBER';
export const TOGGLE_ORDER_DATA = 'TOGGLE_ORDER_DATA';

export function getIngredientsRequest() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredients().then(res => {
      if (res) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          items: res
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      }
    });
  };
}

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
  }
}