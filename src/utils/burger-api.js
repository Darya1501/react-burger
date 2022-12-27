import { getCookie, setCookie } from "./cookies";

const API = 'https://norma.nomoreparties.space/api';

const checkReponse = res => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const checkSuccessField = data => {
  return data.success ? data : Promise.reject("Success field is not equal true");
}

const saveTokens = (refreshToken, accessToken) => {
  localStorage.setItem('refreshToken', refreshToken);
  setCookie('accessToken', accessToken.split('Bearer ')[1], {expires: 20 * 60 });
}

const deleteTokens = () => {
  localStorage.removeItem('refreshToken');
  setCookie('accessToken', '', {expires: 0 });
}

export const getIngredients = async () => {
  const response = await fetch(`${API}/ingredients`)
    .then(checkReponse)
    .then(checkSuccessField)
    .then(data => data.data)
    .catch(error => {
      throw new Error(error)
    })
  return response
}

export const postOrder = async (order) => {
  const orderID = await fetch(`${API}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ingredients: order})
  })
  .then(checkReponse)
  .then(checkSuccessField)
  .then(data => data.order.number)
  .catch(error => {
    throw new Error(error.message)
  })
  return orderID
}

export const createNewUser = async (user) => {
  const newUser = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...user })
  })
  .then(checkReponse)
  .then(checkSuccessField)
  .then(data => {
    saveTokens(data.refreshToken, data.accessToken)
    return data.user
  })
  .catch(error => { throw new Error(error.message) })
  return newUser
}

export const authorizeUser = async (user) => {
  const newUser = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...user })
  })
  .then(checkReponse)
  .then(checkSuccessField)
  .then(data => {
    saveTokens(data.refreshToken, data.accessToken)
    return data.user
  })
  .catch(error => { throw new Error(error.message) })
  return newUser
}

export const sendResetPasswordEmail = async (email) => {
  const message = await fetch(`${API}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email })
  })
  .then(checkReponse)
  .then(checkSuccessField)
  .then(data => data.message)
  .catch(error => { throw new Error(error.message) })
  return message
}

export const resetUserPassword = async (password, token) => {
  const message = await fetch(`${API}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password: password, token: token })
  })
  .then(checkReponse)
  .then(checkSuccessField)
  .then(data => data.message)
  .catch(error => { throw new Error(error.message) })
  return message
}

export const updateToken = async () => {
  const refreshToken =  localStorage.getItem('refreshToken');
  const newTokens = await fetch(`${API}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: refreshToken })
  })
  .then(checkReponse)
  .then(checkSuccessField)
  .then(data => saveTokens(data.refreshToken, data.accessToken))
  .catch(error => { throw new Error(error.message) })
  return newTokens
}

export const logout = async () => {
  const refreshToken =  localStorage.getItem('refreshToken');
  const message = await fetch(`${API}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: refreshToken })
  })
  .then(checkReponse)
  .then(checkSuccessField)
  .then(deleteTokens)
  .catch(error => { throw new Error(error.message) })
  return message
}

export const getUser = async () => {
  const accessToken = getCookie('accessToken');
  if (accessToken) {
    const user = await fetch(`${API}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      }
    })
    .then(checkReponse)
    .then(checkSuccessField)
    .then(data => data.user)
    .catch(error => { throw new Error(error) })
    return user
  } else {
    await updateToken();
    getUser();
  }
}

export const changeUserInfo = async (data) => {
  const accessToken = getCookie('accessToken');
  const userData = await fetch(`${API}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    },
    body: JSON.stringify({ ...data }),
  })
  .then(checkReponse)
  .then(checkSuccessField)
  .then(data => data.user)
  .catch(error => {
    throw new Error(error)
  })
  return userData
}