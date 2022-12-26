import { resetUserPassword, sendResetPasswordEmail } from "../../utils/burger-api";

export const SEND_EMAIL_REQUEST = 'SEND_EMAIL_REQUEST';
export const SEND_EMAIL_SUCCESS = 'SEND_EMAIL_SUCCESS';
export const SEND_EMAIL_FAILED = 'SEND_EMAIL_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

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