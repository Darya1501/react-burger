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
import { userReducer } from "../reducers/user";

const initialState = {
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

const user = {
  email: 'mail12345@mail.ru',
  name: 'User',
  password: ''
};

describe('user reducer', () => {

  test('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(initialState)
  })

  test('should handle REGISTER_SUCCESS', () => {
    const expected = {
      ...initialState,
      registerFaild: false,
      registerSuccess: true,
      isUserAuthorized: true,
      user: user
    };
    const received = userReducer(initialState, { type: REGISTER_SUCCESS, user: user });
    expect(received).toEqual(expected)
  });

  test('should handle REGISTER_FAILED', () => {
    const expected = {
      ...initialState,
      registerFaild: true,
      registerSuccess: false,
      errorMessage: 'error'
    };
    const received = userReducer(initialState, { type: REGISTER_FAILED, message: 'error' });
    expect(received).toEqual(expected)
  });

  test('should handle AUTH_SUCCESS', () => {
    const expected = {
      ...initialState,
      authFaild: false,
      authSuccess: true,
      isUserAuthorized: true,
      user: user
    };
    const received = userReducer(initialState, { type: AUTH_SUCCESS, user: user });
    expect(received).toEqual(expected)
  });

  test('should handle AUTH_FAILED', () => {
    const expected = {
      ...initialState,
      authFaild: true,
      authSuccess: false,
      errorMessage: 'error'
    };
    const received = userReducer(initialState, { type: AUTH_FAILED, message: 'error' });
    expect(received).toEqual(expected)
  });

  test('should handle SEND_EMAIL_REQUEST', () => {
    const expected = {
      ...initialState,
      sendEmailRequest: true
    };
    const received = userReducer(initialState, { type: SEND_EMAIL_REQUEST });
    expect(received).toEqual(expected)
  });

  test('should handle SEND_EMAIL_SUCCESS', () => {
    const expected = {
      ...initialState,
      sendEmailRequest: false,
      sendEmailFaild: false,
      sendEmailSuccess: true,
      sendEmailMessage: 'some message'
    };
    const received = userReducer(initialState, { type: SEND_EMAIL_SUCCESS, message: 'some message' });
    expect(received).toEqual(expected)
  });

  test('should handle SEND_EMAIL_FAILED', () => {
    const expected = {
      ...initialState,
      sendEmailRequest: false,
      sendEmailFaild: true,
      sendEmailSuccess: false,
      sendEmailMessage: 'some message'
    };
    const received = userReducer(initialState, { type: SEND_EMAIL_FAILED, message: 'some message' });
    expect(received).toEqual(expected)
  });

  test('should handle RESET_PASSWORD_REQUEST', () => {
    const expected = {
      ...initialState,
      resetPasswordRequest: true
    };
    const received = userReducer(initialState, { type: RESET_PASSWORD_REQUEST });
    expect(received).toEqual(expected)
  });

  test('should handle RESET_PASSWORD_SUCCESS', () => {
    const expected = {
      ...initialState,
      resetPasswordRequest: false,
      resetPasswordFaild: false,
      resetPasswordSuccess: true,
      resetPasswordMessage: 'success'
    };
    const received = userReducer(initialState, { type: RESET_PASSWORD_SUCCESS, message: 'success' });
    expect(received).toEqual(expected)
  });

  test('should handle RESET_PASSWORD_FAILED', () => {
    const expected = {
      ...initialState,
      resetPasswordRequest: false,
        resetPasswordFaild: true,
        resetPasswordSuccess: false,
      resetPasswordMessage: 'error'
    };
    const received = userReducer(initialState, { type: RESET_PASSWORD_FAILED, message: 'error' });
    expect(received).toEqual(expected)
  });

  test('should handle LOGOUT_USER', () => {
    const expected = initialState;
    const received = userReducer(initialState, { type: LOGOUT_USER });
    expect(received).toEqual(expected)
  });

  test('should handle SET_USER_DATA', () => {
    const expected = {
      ...initialState,
      user: user,
      isUserAuthorized: true
    };
    const received = userReducer(initialState, { type: SET_USER_DATA, user: user });
    expect(received).toEqual(expected)
  });

})