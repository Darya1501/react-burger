import { TUser } from "../../utils/types";
import { TUserActions } from "../actions/user";
import { 
  REGISTER_SUCCESS,
  REGISTER_FAILED,

  SEND_EMAIL_REQUEST,
  SEND_EMAIL_FAILED,
  SEND_EMAIL_SUCCESS,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,

  AUTH_SUCCESS,
  AUTH_FAILED,

  LOGOUT_USER,
  SET_USER_DATA,
} from "../constants/user";

type TUserState = {
  sendEmailRequest: boolean,
  sendEmailFaild: boolean,
  sendEmailSuccess: boolean,
  sendEmailMessage: string,

  resetPasswordRequest: boolean,
  resetPasswordFaild: boolean,
  resetPasswordSuccess: boolean,
  resetPasswordMessage: string,

  registerFaild: boolean,
  registerSuccess: boolean,

  authFaild: boolean,
  authSuccess: boolean,
  isUserAuthorized: boolean,

  errorMessage: string,

  user: TUser
}

const initialOrderState: TUserState = {
  sendEmailRequest: false,
  sendEmailFaild: false,
  sendEmailSuccess: false,
  sendEmailMessage: '',

  resetPasswordRequest: false,
  resetPasswordFaild: false,
  resetPasswordSuccess: false,
  resetPasswordMessage: '',

  registerFaild: false,
  registerSuccess: false,

  authFaild: false,
  authSuccess: false,
  isUserAuthorized: false,

  errorMessage: '',

  user: {
    name: '',
    email: ''
  }
}

export const userReducer = (state = initialOrderState, action: TUserActions): TUserState => {
  switch (action.type) {
    case REGISTER_SUCCESS: {
      return {
        ...state,
        registerFaild: false,
        registerSuccess: true,
        isUserAuthorized: true,
        ...action.user,
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        registerFaild: true,
        registerSuccess: false,
        errorMessage: action.message
      };
    }
    case AUTH_SUCCESS: {
      return {
        ...state,
        authFaild: false,
        authSuccess: true,
        isUserAuthorized: true,
        ...action.user,
      };
    }
    case AUTH_FAILED: {
      return {
        ...state,
        authFaild: true,
        authSuccess: false,
        errorMessage: action.message
      };
    }
    case SEND_EMAIL_REQUEST: {
      return {
        ...state,
        sendEmailRequest: true,
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
        resetPasswordRequest: true,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFaild: false,
        resetPasswordSuccess: true,
        resetPasswordMessage: action.message
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFaild: true,
        resetPasswordSuccess: false,
        resetPasswordMessage: action.message
      };
    }
    case LOGOUT_USER: {
      return {
        ...state, 
        user: {
          name: '',
          email: ''
        },
        isUserAuthorized: false
      }
    }
    case SET_USER_DATA: {
      return {
        ...state,
        user: action.user,
        isUserAuthorized: true
      }
    }
    default: {
      return state;
    }
  }
}