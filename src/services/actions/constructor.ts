import { TIngredient } from "../../utils/types";
import {
  ADD_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
  MOVE_CONSTRUCTOR_INGREDIENT,
  CHANGE_CONSTRUCTOR_BUN,
  CLEAR_CONSTRUCTOR
} from '../constants/constructor'

export interface IAddConstructorIngredient {
  readonly type: typeof ADD_CONSTRUCTOR_INGREDIENT;
  ingredient: TIngredient;
  constructorID: number;
}
export interface IRemoveConstructorIngredirent {
  readonly type: typeof REMOVE_CONSTRUCTOR_INGREDIENT;
  constructorID: number;
}
export interface IMoveConstructorIngredient {
  readonly type: typeof MOVE_CONSTRUCTOR_INGREDIENT;
  dragIndex: number;
  hoverIndex: number;
}
export interface IChangeConstructorBun {
  readonly type: typeof CHANGE_CONSTRUCTOR_BUN;
  bun: TIngredient;
}
export interface IClearConstructor {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TConstructorActions = 
  IAddConstructorIngredient |
  IRemoveConstructorIngredirent |
  IMoveConstructorIngredient |
  IChangeConstructorBun |
  IClearConstructor;

export function addConstructorIngredient(ingredient: TIngredient): IAddConstructorIngredient {
  return({
    type: ADD_CONSTRUCTOR_INGREDIENT,
    ingredient: ingredient,
    constructorID: Date.now()
  })
}