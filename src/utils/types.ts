import { TConstructorActions } from '../services/actions/constructor';
import { TIngredientsActions } from '../services/actions/ingredients';
import { TOrderActions } from '../services/actions/order';
import { TUserActions } from '../services/actions/user';
import { store } from '../services/srore';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TWsActions } from '../services/actions/websocket';

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions =
  TConstructorActions |
  TIngredientsActions |
  TOrderActions |
  TUserActions |
  TWsActions;

export type AppThunk<TReturn = void> = ThunkAction<TReturn, RootState, never, TApplicationActions>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export interface IMessage {
  
}

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