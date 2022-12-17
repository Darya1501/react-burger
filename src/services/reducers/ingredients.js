import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,

  ADD_CONSTRUCTOR_INGREDIENT,
  CHANGE_CONSTRUCTOR_BUN,
  MOVE_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT
} from '../actions/ingredients';

export const initialIngredientState = {
  ingredients: [],
  ingredientsRequest: true,
  ingredientsFailed: false,

  constructorBun: null,
  constructorIngredients: [],
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
        ingredients: action.items.map((item, index) =>({...item, count: index === 0 ? 2 : 0})),
        ingredientsRequest: false,
        constructorBun: action.items[0],
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    case ADD_CONSTRUCTOR_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients,
          {
            ...action.ingredient,
            constructorID: action.constructorID
          }
        ],
        ingredients: [
          ...state.ingredients.map(item => item._id === action.ingredient._id ? {...item, count: item.count + 1} : item)
        ]
      }
    }
    case REMOVE_CONSTRUCTOR_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: state.constructorIngredients.filter(item => item.constructorID !== action.constructorID),
        ingredients: [
          ...state.ingredients.map(item => item._id === action._id ? {...item, count: item.count - 1} : item)
        ]
      }
    }
    case MOVE_CONSTRUCTOR_INGREDIENT: {
      const data = [...state.constructorIngredients];
      data.splice(action.dragIndex, 0, data.splice(action.hoverIndex, 1)[0]);
      return {
        ...state,
        constructorIngredients: data
      }
    }
    case CHANGE_CONSTRUCTOR_BUN: {
      return {
        ...state,
        constructorBun: action.bun,
        ingredients: state.ingredients.map(item =>
          item._id === action.bun._id ? 
            ({...item, count: 2}) : (item.type === 'bun' ? {...item, count: 0} : item))
      }
    }
    default: {
      return state;
    }
  }
};
