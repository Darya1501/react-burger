import { getIngredients } from "../../utils/burger-api";

// Получение списка ингредиентов от API
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const INCREMENT_IGREDIENT_COUNT = 'INCREMENT_IGREDIENT_COUNT';
export const DECREMENT_IGREDIENT_COUNT = 'DECREMENT_IGREDIENT_COUNT';
export const CHANGE_BUNS_COUNT = 'CHANGE_BUNS_COUNT';

export function getIngredientsRequest() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredients().then(res => {
      if (res) {
        dispatch({ type: GET_INGREDIENTS_SUCCESS, items: res });
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