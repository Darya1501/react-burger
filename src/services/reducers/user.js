import { 
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,

  SEND_EMAIL_REQUEST,
  SEND_EMAIL_FAILED,
  SEND_EMAIL_SUCCESS,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILED,
  UPDATE_USER_TOKEN,
  LOGOUT_USER,
} from "../actions/user";

const initialOrderState = {
  sendEmailRequest: false,
  sendEmailFaild: false,
  sendEmailSuccess: false,
  sendEmailMessage: '',

  resetPasswordRequest: false,
  resetPasswordFaild: false,
  resetPasswordSuccess: false,
  resetPasswordMessage: '',

  registerRequest: false,
  registerFaild: false,
  registerSuccess: false,

  authRequest: false,
  authFaild: false,
  authSuccess: false,

  errorMessage: '',

  user: null,
  accessToken: '',
  refreshToken: ''
}

export const userReducer = (state = initialOrderState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        registerFaild: false,
        registerSuccess: true,
        ...action.data
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerFaild: true,
        registerSuccess: false,
        errorMessage: action.message
      };
    }
    case AUTH_REQUEST: {
      return {
        ...state,
        authRequest: true
      };
    }
    case AUTH_SUCCESS: {
      return {
        ...state,
        authRequest: false,
        authFaild: false,
        authSuccess: true,
        ...action.data
      };
    }
    case AUTH_FAILED: {
      return {
        ...state,
        authRequest: false,
        authFaild: true,
        authSuccess: false,
        errorMessage: action.message
      };
    }
    case SEND_EMAIL_REQUEST: {
      return {
        ...state,
        sendEmailRequest: true
      };
    }
    case SEND_EMAIL_SUCCESS: {
      return {
        ...state,
        sendEmailRequest: false,
        sendEmailFaild: false,
        sendEmailSuccess: true,
        sendEmailMessage: action.message
      };
    }
    case SEND_EMAIL_FAILED: {
      return {
        ...state,
        sendEmailRequest: false,
        sendEmailFaild: true,
        sendEmailSuccess: false,
        sendEmailMessage: action.message
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        sendEmailRequest: true
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        sendEmailRequest: false,
        sendEmailFaild: false,
        sendEmailSuccess: true,
        sendEmailMessage: action.message
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        sendEmailRequest: false,
        sendEmailFaild: true,
        sendEmailSuccess: false,
        sendEmailMessage: action.message
      };
    }
    case UPDATE_USER_TOKEN: {
      return {
        ...state, 
        accessToken: action.accessToken,
        refreshToken: action.refreshToken
      }
    }
    case LOGOUT_USER: {
      return {
        ...state, 
        user: null,
        refreshToken: '',
        accessToken: ''
      }
    }
    default: {
      return state;
    }
  }
}