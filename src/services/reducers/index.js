import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, HIDE_INGREDIENT_DATA, SHOW_INGREDIENT_DATA } from '../actions';

const initialIngredientState = {
  ingredients: [],
  ingredientsRequest: true,
  ingredientsFailed: false,

  constructorBun: {},
  constructorIngredients: [],

  order: {}
}

const initialModalState = {
  currentViewedIngredient: {},
  isIngredientModalVisible: false,
}

export const ingredientsReducer = (state = initialIngredientState, action) => {
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
        ingredients: action.items,
        ingredientsRequest: false,
        constructorBun: action.items[0],
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    default: {
      return state;
    }
  }
};

export const modalReducer = (state = initialModalState, action) => {
  switch (action.type) {
    case SHOW_INGREDIENT_DATA: {
      return { 
        ...state,
        isIngredientModalVisible: true,
        currentViewedIngredient: action.item
      };
    }
    case HIDE_INGREDIENT_DATA: {
      return {
        ...state,
        isIngredientModalVisible: false,
        currentViewedIngredient: {}
      };
    }
    default: {
      return state;
    }
  }
};

