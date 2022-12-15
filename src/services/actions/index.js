import { getIngredients } from "../../utils/burger-api";

// Получение списка ингредиентов от API
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

// Получение списка ингредиентов для конструктора бургера
export const GET_CONSTRUCTOR_INGREDIENTS = 'GET_CONSTRUCTOR_INGREDIENTS';

// Просмотр ингредиента в модальном окне
export const SHOW_INGREDIENT_DATA = 'SHOW_INGREDIENT_DATA';
export const HIDE_INGREDIENT_DATA = 'HIDE_INGREDIENT_DATA';

// Получение номера заказа в модальном окне
export const GET_ORDER_NUMBER = 'GET_ORDER_NUMBER';

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