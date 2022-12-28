import {
  ADD_CONSTRUCTOR_INGREDIENT,
  CHANGE_CONSTRUCTOR_BUN,
  CLEAR_CONSTRUCTOR,
  MOVE_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT
} from '../actions/constructor';

export const initialConstructorState = {
  constructorBun: null,
  constructorIngredients: [],
}

export const constructorReducer = (state = initialConstructorState, action) => {
  switch (action.type) {
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
      }
    }
    case REMOVE_CONSTRUCTOR_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: state.constructorIngredients.filter(item => item.constructorID !== action.constructorID)
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
      }
    }
    case CLEAR_CONSTRUCTOR: {
      return initialConstructorState
    }
    default: {
      return state;
    }
  }
}