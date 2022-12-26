import { 
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_FAILED,
  SEND_EMAIL_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
} from "../actions/user";

const initialOrderState = {
  sendEmailRequest: false,
  sendEmailFaild: false,
  sendEmailSuccess: false,
  sendEmailMessage: '',

  resetPAsswordRequest: false,
  resetPAsswordFaild: false,
  resetPAsswordSuccess: false,
  resetPAsswordMessage: '',
}

export const userReducer = (state = initialOrderState, action) => {
  switch (action.type) {
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
    default: {
      return state;
    }
  }
}