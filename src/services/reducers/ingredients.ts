import { TIngredient } from '../../utils/types';
import { TIngredientsActions } from '../actions/ingredients';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREMENT_IGREDIENT_COUNT,
  DECREMENT_IGREDIENT_COUNT,
  CHANGE_BUNS_COUNT
} from '../constants/ingredients';

type TIngredientsState = {
  ingredients: Array<TIngredient>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
}

export const initialIngredientState: TIngredientsState = {
  ingredients: [],
  ingredientsRequest: true,
  ingredientsFailed: false,
}

export const ingredientsReducer = (state = initialIngredientState, action: TIngredientsActions): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredients: action.ingredients.map(item => ({ ...item, count: 0 })),
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    case INCREMENT_IGREDIENT_COUNT: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients.map(item => item._id === action.ingredient._id ? { ...item, count: item.count + 1 } : item)
        ]
      };
    }
    case DECREMENT_IGREDIENT_COUNT: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients.map(item => item._id === action.id ? { ...item, count: item.count - 1 } : item)
        ]
      };
    }
    case CHANGE_BUNS_COUNT: {
      return {
        ...state,
        ingredients: state.ingredients.map(item => item._id === action.bun._id ?
          ({ ...item, count: 2 }) : (item.type === 'bun' ? { ...item, count: 0 } : item))
      };
    }
    default: {
      return state;
    }
  }
}
