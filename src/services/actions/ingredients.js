import { getIngredients } from "../../utils/burger-api";

// Получение списка ингредиентов от API
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

// Работа с конструктором бургера
export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT';
export const REMOVE_CONSTRUCTOR_INGREDIENT = 'REMOVE_CONSTRUCTOR_INGREDIENT';
export const MOVE_CONSTRUCTOR_INGREDIENT = 'MOVE_CONSTRUCTOR_INGREDIENT';
export const CHANGE_CONSTRUCTOR_BUN = 'CHANGE_CONSTRUCTOR_BUN';

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
    })
    .catch(error => {
      console.error(error);
      dispatch({
        type: GET_INGREDIENTS_FAILED
      });
    });
  };
}