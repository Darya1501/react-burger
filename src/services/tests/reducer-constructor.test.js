import {
  ADD_CONSTRUCTOR_INGREDIENT,
  CHANGE_CONSTRUCTOR_BUN,
  CLEAR_CONSTRUCTOR,
  MOVE_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT
} from '../constants/constructor';
import { constructorReducer } from '../reducers/constructor';

export const initialState = {
  constructorBun: null,
  constructorIngredients: []
}

const ingredient = {
  id: '123'
}
const constructorID = '510294'

describe('user reducer', () => {

  test('should return the initial state', () => {
    expect(constructorReducer(undefined, {})).toEqual(initialState)
  })

  test('should handle ADD_CONSTRUCTOR_INGREDIENT', () => {
    const expected = {
      ...initialState,
      constructorIngredients: [
        {
          ...ingredient,
          constructorID: constructorID
        }
      ]
    }
    const received = constructorReducer(initialState, {
      type: ADD_CONSTRUCTOR_INGREDIENT,
      ingredient: ingredient,
      constructorID: constructorID
    })
    expect(received).toEqual(expected)
  })

  test('should handle REMOVE_CONSTRUCTOR_INGREDIENT', () => {
    const stateWithIngredient = {
      ...initialState,
      constructorIngredients: [
        {
          ...ingredient,
          constructorID: constructorID
        }
      ]
    }
    const expected = {
      ...initialState,
      constructorIngredients: []
    }
    const received = constructorReducer(stateWithIngredient, {
      type: REMOVE_CONSTRUCTOR_INGREDIENT,
      constructorID: constructorID
    })
    expect(received).toEqual(expected)
  })

  test('should handle MOVE_CONSTRUCTOR_INGREDIENT', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorIngredients: [
        { ...ingredient, constructorID: constructorID },
        { id: "не 123", constructorID: "12345" }
      ]
    }
    const expected = {
      ...initialState,
      constructorIngredients: [
        { id: "не 123", constructorID: "12345" },
        { ...ingredient, constructorID: constructorID }
      ]
    }
    const received = constructorReducer(stateWithIngredients, {
      type: MOVE_CONSTRUCTOR_INGREDIENT, dragIndex: 0, hoverIndex: 1
    })
    expect(received).toEqual(expected)
  })

  test('should handle CHANGE_CONSTRUCTOR_BUN', () => {
    const expected = {
      ...initialState,
      constructorBun: ingredient
    }
    const received = constructorReducer(initialState, {
      type: CHANGE_CONSTRUCTOR_BUN,
      bun: ingredient
    })
    expect(received).toEqual(expected)
  })

  test('should handle CLEAR_CONSTRUCTOR', () => {
    const someState = {
      ...initialState, 
      constructorBun: ingredient,
      constructorIngredients: [
        { ...ingredient, constructorID: constructorID },
        { id: "не 123", constructorID: "12345" }
      ]
    }
    expect(constructorReducer(someState, {
      type: CLEAR_CONSTRUCTOR
    })).toEqual(initialState)
  })
})