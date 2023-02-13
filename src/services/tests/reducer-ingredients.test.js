import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREMENT_IGREDIENT_COUNT,
  DECREMENT_IGREDIENT_COUNT,
  CHANGE_BUNS_COUNT,
  RESET_INGREDIENTS_COUNT
} from '../constants/ingredients';
import { ingredientsReducer } from '../reducers/ingredients';

const initialState = {
  ingredients: [],
  ingredientsRequest: true,
  ingredientsFailed: false,
}

const ingredients = [
  { _id: '123', type: 'bun' },
  { _id: '124', type: 'bun' },
  { _id: '423', type: 'main' }
]

const ingredientsWithCount = [
  { _id: '123', type: 'bun', count: 0 },
  { _id: '124', type: 'bun', count: 0 },
  { _id: '423', type: 'main', count: 0 }
]

describe('ingredients reducer', () => {

  test('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState)
  })

  test('should handle GET_INGREDIENTS_REQUEST', () => {
    const expected = {
      ...initialState,
      ingredientsRequest: true
    };
    const received = ingredientsReducer(initialState, { type: GET_INGREDIENTS_REQUEST });
    expect(received).toEqual(expected)
  });

  test('should handle GET_INGREDIENTS_SUCCESS', () => {
    const expected = {
      ...initialState,
      ingredientsFailed: false,
      ingredients: ingredientsWithCount,
      ingredientsRequest: false,
    };
    const received = ingredientsReducer(initialState, { type: GET_INGREDIENTS_SUCCESS, ingredients: ingredients });
    expect(received).toEqual(expected)
  });

  test('should handle GET_INGREDIENTS_FAILED', () => {
    const expected = {
      ...initialState,
      ingredientsFailed: true,
      ingredientsRequest: false
    };
    const received = ingredientsReducer(initialState, { type: GET_INGREDIENTS_FAILED });
    expect(received).toEqual(expected)
  });

  test('should handle INCREMENT_IGREDIENT_COUNT', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: ingredientsWithCount
    }
    const expected = {
      ...initialState,
      ingredients: [
        { _id: '123', type: 'bun', count: 0 },
        { _id: '124', type: 'bun', count: 0 },
        { _id: '423', type: 'main', count: 1 }
      ]
    };
    const received = ingredientsReducer(stateWithIngredients, { type: INCREMENT_IGREDIENT_COUNT, ingredient: ingredients[2] });
    expect(received).toEqual(expected)
  });

  test('should handle DECREMENT_IGREDIENT_COUNT', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [
        { _id: '123', type: 'bun', count: 0 },
        { _id: '124', type: 'bun', count: 0 },
        { _id: '423', type: 'main', count: 1 }
      ]
    }
    const expected = {
      ...initialState,
      ingredients: ingredientsWithCount
    };
    const received = ingredientsReducer(stateWithIngredients, { type: DECREMENT_IGREDIENT_COUNT, id: '423' });
    expect(received).toEqual(expected)
  });

  test('should handle CHANGE_BUNS_COUNT', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [
        { _id: '123', type: 'bun', count: 2 },
        { _id: '124', type: 'bun', count: 0 },
        { _id: '423', type: 'main', count: 1 }
      ]
    }
    const expected = {
      ...initialState,
      ingredients: [
        { _id: '123', type: 'bun', count: 0 },
        { _id: '124', type: 'bun', count: 2 },
        { _id: '423', type: 'main', count: 1 }
      ]
    };
    const received = ingredientsReducer(stateWithIngredients, { type: CHANGE_BUNS_COUNT, bun: ingredients[1] });
    expect(received).toEqual(expected)
  });


  test('should handle RESET_INGREDIENTS_COUNT', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [
        { _id: '123', type: 'bun', count: 2 },
        { _id: '124', type: 'bun', count: 0 },
        { _id: '423', type: 'main', count: 1 }
      ]
    }
    const expected = {
      ...initialState,
      ingredients: ingredientsWithCount
    };
    const received = ingredientsReducer(stateWithIngredients, { type: RESET_INGREDIENTS_COUNT });
    expect(received).toEqual(expected)
  });

})