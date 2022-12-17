


import {
  SHOW_INGREDIENT_DATA,
  HIDE_INGREDIENT_DATA
} from '../actions/modal';


const initialModalState = {
  currentViewedIngredient: null,
  isIngredientModalVisible: false,
}



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
        currentViewedIngredient: null
      };
    }
    default: {
      return state;
    }
  }
};
