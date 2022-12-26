import { authorizeUser, createNewUser, logout, resetUserPassword, sendResetPasswordEmail, updateToken } from "../../utils/burger-api";
import { setCookie } from "../../utils/cookies";

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILED = 'AUTH_FAILED';

export const SEND_EMAIL_REQUEST = 'SEND_EMAIL_REQUEST';
export const SEND_EMAIL_SUCCESS = 'SEND_EMAIL_SUCCESS';
export const SEND_EMAIL_FAILED = 'SEND_EMAIL_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const UPDATE_USER_TOKEN = 'UPDATE_USER_TOKEN';

export const LOGOUT_USER = 'LOGOUT_USER';

const saveTokens = (refreshToken, accessToken) => {
  const CurrentTime = new Date();
  setCookie('refreshToken', refreshToken)
  setCookie('accessToken', accessToken.split('Bearer ')[1], {expires: CurrentTime.setMinutes(CurrentTime.getMinutes() + 20) })
}

export function registerUser(user) {
  return function(dispatch) {
    dispatch({ type: REGISTER_REQUEST });
    createNewUser(user).then(data => {
      if(data) {
        dispatch({
          type: REGISTER_SUCCESS,
          data: data,
        })
        saveTokens(data.refreshToken, data.accessToken)
      } else {
        dispatch({ type: REGISTER_FAILED });
      }
    })
    .catch(error => {
      console.error(error);
      dispatch({ type: REGISTER_FAILED, message: error.message });
    });
  }
}

export function loginUser(user) {
  return function(dispatch) {
    dispatch({ type: AUTH_REQUEST });
    authorizeUser(user).then(data => {
      if(data) {
        dispatch({
          type: AUTH_SUCCESS,
          data: data,
        })
        saveTokens(data.refreshToken, data.accessToken)
      } else {
        dispatch({ type: AUTH_FAILED }); 
      }
    })
    .catch(error => {
      console.error(error);
      dispatch({ type: AUTH_FAILED, message: error.message });
    });
  }
}

export function sendResetCode(email) {
  return function(dispatch) {
    dispatch({ type: SEND_EMAIL_REQUEST });
    sendResetPasswordEmail(email).then(message => {
      if(message) {
        dispatch({
          type: SEND_EMAIL_SUCCESS,
          message: message
        })
      } else {
        dispatch({ type: SEND_EMAIL_FAILED });
      }
    })
    .catch(error => {
      console.error(error);
      dispatch({ type: SEND_EMAIL_FAILED });
    });
  }
}

export function cangeUserPassword(password, token) {
  return function(dispatch) {
    dispatch({ type: SEND_EMAIL_REQUEST });
    resetUserPassword(password, token).then(message => {
      if(message) {
        dispatch({
          type: SEND_EMAIL_SUCCESS,
          message: message
        })
      } else {
        dispatch({ type: SEND_EMAIL_FAILED });
      }
    })
    .catch(error => {
      console.error(error);
      dispatch({ type: SEND_EMAIL_FAILED });
    });
  }
}

export function changeAccessToken() {
  return function(dispatch) {
    updateToken().then(data => {
      dispatch({
        type: UPDATE_USER_TOKEN,
        ...data
      })
      saveTokens(data.refreshToken, data.accessToken)
    })
    .catch(error => {
      console.error(error);
    });
  }
}

export function logoutUser() {
  return function(dispatch) {
    logout().then(data => {
      dispatch({
        type: LOGOUT_USER,
        ...data
      })
      document.deleteCookie('refreshToken');
      document.deleteCookie('accessToken');
    })
    .catch(error => {
      console.error(error);
    });
  }
}