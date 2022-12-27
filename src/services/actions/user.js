import { authorizeUser, changeUserInfo, createNewUser, getUser, logout, resetUserPassword, sendResetPasswordEmail } from "../../utils/burger-api";

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

export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_USER_DATA = 'SET_USER_DATA';

export function getUserData() {
  return function(dispatch) {
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
}

export function registerUser(user) {
  return function(dispatch) {
    dispatch({ type: REGISTER_REQUEST });
    createNewUser(user).then(newUser => {
      if(newUser) {
        dispatch({
          type: REGISTER_SUCCESS,
          user: newUser,
        })
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
    authorizeUser(user).then(user => {
      if(user) {
        dispatch({
          type: AUTH_SUCCESS,
          user: user,
        })
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

export function logoutUser() {
  return function(dispatch) {
    logout().then(() => { dispatch({ type: LOGOUT_USER }) })
    .catch(error => console.error(error));
  }
}

export function cangeUserData(data) {
  return function(dispatch) {
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
}