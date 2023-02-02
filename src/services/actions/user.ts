import { authorizeUser, changeUserInfo, createNewUser, getUser, logout, resetUserPassword, sendResetPasswordEmail } from "../../utils/burger-api";
import { AppDispatch, AppThunk, TUser } from "../../utils/types";

import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  AUTH_SUCCESS,
  AUTH_FAILED,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  LOGOUT_USER,
  SET_USER_DATA
} from '../constants/user';

export interface IRegisterSuccess {
  readonly type: typeof REGISTER_SUCCESS;
  user: TUser
}
export interface IRegisterFailed {
  readonly type: typeof REGISTER_FAILED;
  message: string
}
export interface IAuthSuccess {
  readonly type: typeof AUTH_SUCCESS;
  user: TUser
}
export interface IAuthFailed {
  readonly type: typeof AUTH_FAILED;
  message: string
}
export interface ISendEmailRequest {
  readonly type: typeof SEND_EMAIL_REQUEST;
}
export interface ISendEmailSuccess {
  readonly type: typeof SEND_EMAIL_SUCCESS;
  message: string
}
export interface ISendEmailFailed {
  readonly type: typeof SEND_EMAIL_FAILED;
  message: string
}
export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  message: string
}
export interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
  message: string
}
export interface ILogoutUser {
  readonly type: typeof LOGOUT_USER;
}
export interface ISetUserData {
  readonly type: typeof SET_USER_DATA;
  user: TUser
}

export type TUserActions = 
  IRegisterSuccess |
  IRegisterFailed |
  IAuthSuccess |
  IAuthFailed |
  ISendEmailRequest |
  ISendEmailSuccess |
  ISendEmailFailed |
  IResetPasswordRequest |
  IResetPasswordSuccess |
  IResetPasswordFailed |
  ILogoutUser |
  ISetUserData;

export const getUserData = (): AppThunk => (dispatch: AppDispatch) => {
  getUser().then(user => {
    if (user) {
      dispatch({
        type: SET_USER_DATA,
        user: user
      })
    }
  })
  .catch(error => {
    console.error(error);
  })
}

export const registerUser = (user: TUser): AppThunk => (dispatch: AppDispatch) => {
  createNewUser(user).then(newUser => {
    if(newUser) {
      dispatch({
        type: REGISTER_SUCCESS,
        user: newUser,
      })
    } else {
      dispatch({ type: REGISTER_FAILED, message: 'Пользователь не был создан' });
    }
  })
  .catch(error => {
    console.error(error);
    dispatch({ type: REGISTER_FAILED, message: error.message });
  });
}

export const loginUser = (user: TUser): AppThunk => (dispatch: AppDispatch) => {
  authorizeUser(user).then(user => {
    if(user) {
      dispatch({
        type: AUTH_SUCCESS,
        user: user,
      })
    } else {
      dispatch({ type: AUTH_FAILED, message: 'Пользователь не был авторизован' }); 
    }
  })
  .catch(error => {
    console.error(error);
    dispatch({ type: AUTH_FAILED, message: error.message });
  });
}

export const sendResetCode = (email: string): AppThunk => (dispatch: AppDispatch) => {
  dispatch({ type: SEND_EMAIL_REQUEST })
  sendResetPasswordEmail(email).then(message => {
    if(message) {
      dispatch({
        type: SEND_EMAIL_SUCCESS,
        message: message
      })
    } else {
      dispatch({ type: SEND_EMAIL_FAILED, message: 'Ошибка отправки сообщения' });
    }
  })
  .catch(error => {
    console.error(error);
    dispatch({ type: SEND_EMAIL_FAILED, message: 'Ошибка отправки сообщения' });
  });
}

export const cangeUserPassword = (password: string, token: string): AppThunk => (dispatch: AppDispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST })
  resetUserPassword(password, token).then(message => {
    if(message) {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        message: message
      })
    } else {
      dispatch({ type: RESET_PASSWORD_FAILED, message: 'Ошибка сброса пароля' });
    }
  })
  .catch(error => {
    console.error(error);
    dispatch({ type: RESET_PASSWORD_FAILED, message: error.message });
  });
}

export const logoutUser = (): AppThunk => (dispatch: AppDispatch) => {
  logout().then(() => { dispatch({ type: LOGOUT_USER }) })
  .catch(error => console.error(error));
}

export const cangeUserData = (data: TUser): AppThunk => (dispatch: AppDispatch) => {
  changeUserInfo(data).then(user => {
    if(user) {
      dispatch({
        type: SET_USER_DATA,
        user: user
      })
    }
  })
  .catch(error => {
    console.error(error);
  });
}
