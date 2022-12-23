// Работа с конструктором бургера
export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT';
export const REMOVE_CONSTRUCTOR_INGREDIENT = 'REMOVE_CONSTRUCTOR_INGREDIENT';
export const MOVE_CONSTRUCTOR_INGREDIENT = 'MOVE_CONSTRUCTOR_INGREDIENT';
export const CHANGE_CONSTRUCTOR_BUN = 'CHANGE_CONSTRUCTOR_BUN';

export function addConstructorIngredient(ingredient) {
  return({
    type: ADD_CONSTRUCTOR_INGREDIENT,
    ingredient: ingredient,
    constructorID: Date.now()
  })
}