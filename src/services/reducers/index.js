import {
  ADD_CONSTRUCTOR_INGREDIENT,
  CHANGE_CONSTRUCTOR_BUN,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  HIDE_INGREDIENT_DATA,
  POST_ORDER_FAILED,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  REMOVE_CONSTRUCTOR_INGREDIENT,
  SHOW_INGREDIENT_DATA,
  TOGGLE_ORDER_DATA
} from '../actions';

const initialIngredientState = {
  ingredients: [],
  ingredientsRequest: true,
  ingredientsFailed: false,

  constructorBun: {},
  constructorIngredients: [],
}

const initialModalState = {
  currentViewedIngredient: {},
  isIngredientModalVisible: false,
}

const initialOrderState = {
  orderRequest: true,
  orderFailed: false,
  order: {},
  isOrderModalVisible: false,
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
        ingredients: action.items.map((item, index) => index === 0 ? {...item, __v: 2} : item),
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
            constructorID: Date.now()
          }
        ],
        ingredients: [
          ...state.ingredients.map(item => item._id === action.ingredient._id ? {...item, __v: item.__v + 1} : item)
        ]
      }
    }
    case REMOVE_CONSTRUCTOR_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: state.constructorIngredients.filter(item => item.constructorID !== action.constructorID),
        ingredients: [
          ...state.ingredients.map(item => item._id === action._id ? {...item, __v: item.__v - 1} : item)
        ]
      }
    }
    case CHANGE_CONSTRUCTOR_BUN: {
      return {
        ...state,
        constructorBun: action.bun,
        ingredients: state.ingredients.map(item =>
          item._id === action.bun._id ? 
            ({...item, __v: 2}) : (item.type === 'bun' ? {...item, __v: 0} : item))
      }
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

export const orderReducer = (state = initialOrderState, action) => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      };
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        order: action.order
      };
    }
    case POST_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    case TOGGLE_ORDER_DATA: {
      return {
        ...state,
        isOrderModalVisible: !state.isOrderModalVisible,
      }
    }
    default: {
      return state;
    }
  }
}
