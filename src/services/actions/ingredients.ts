import { getIngredients } from "../../utils/burger-api";
import { AppDispatch, AppThunk, TIngredient } from "../../utils/types";

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREMENT_IGREDIENT_COUNT,
  DECREMENT_IGREDIENT_COUNT,
  CHANGE_BUNS_COUNT
} from '../constants/ingredients';

export interface IGetIngredientRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  ingredients: Array<TIngredient>
}
export interface IGetIngredientFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface IIncrementIngredientCount {
  readonly type: typeof INCREMENT_IGREDIENT_COUNT;
  ingredient: TIngredient
}
export interface IDecrementIngredientCount {
  readonly type: typeof DECREMENT_IGREDIENT_COUNT;
  id: string
}
export interface IChangeBunCount {
  readonly type: typeof CHANGE_BUNS_COUNT;
  bun: TIngredient
}

export type TIngredientsActions = 
  IGetIngredientRequest |
  IGetIngredientSuccess |
  IGetIngredientFailed |
  IIncrementIngredientCount |
  IDecrementIngredientCount |
  IChangeBunCount;

export const getIngredientsRequest: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST
  });
  getIngredients().then(res => {
    if (res) {
      dispatch({ type: GET_INGREDIENTS_SUCCESS, ingredients: res });
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