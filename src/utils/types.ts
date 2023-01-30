import { TConstructorActions } from '../services/actions/constructor';
import { TIngredientsActions } from '../services/actions/ingredients';
import { TOrderActions } from '../services/actions/order';
import { TUserActions } from '../services/actions/user';
import { store } from '../services/srore';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { Dispatch } from 'react';

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions =
  TConstructorActions |
  TIngredientsActions |
  TOrderActions |
  TUserActions;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;

export type AppDispatch = Dispatch<TApplicationActions>;

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  constructorID: number,
  count: number;
}

export interface ILocation {
  pathname: string;
  search: string;
  hash: string;
}

export type TUser = {
  name: string;
  email: string;
  password?: string;
}

export type TOrder = {
  id: number;
  components: Array<string>;
}