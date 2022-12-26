const API = 'https://norma.nomoreparties.space/api';

const checkReponse = res => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const checkSuccessField = data => {
  return data.success ? data : Promise.reject("Success field is not equal true");
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
  .then(data => ({ user: data.user, accessToken: data.accessToken, refreshToken: data.refreshToken }))
  .catch(error => {
    throw new Error(error.message)
  })
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
  .then(data => ({ user: data.user, accessToken: data.accessToken, refreshToken: data.refreshToken }))
  .catch(error => {
    throw new Error(error.message)
  })
  return newUser
}

export const sendResetPasswordEmail = async (email) => {
  const message = await fetch(`${API}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: email})
  })
  .then(checkReponse)
  .then(checkSuccessField)
  .then(data => data.message)
  .catch(error => {
    throw new Error(error.message)
  })
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
  .catch(error => {
    throw new Error(error.message)
  })
  return message
}

export const updateToken = async (refreshToken) => {
  const newToken = await fetch(`${API}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: refreshToken })
  })
  .then(checkReponse)
  .then(checkSuccessField)
  .then(data => ({ accessToken: data.accessToken, refreshToken: data.refreshToken }))
  .catch(error => {
    throw new Error(error.message)
  })
  return newToken
}

export const logout = async (refreshToken) => {
  const message = await fetch(`${API}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: refreshToken })
  })
  .then(checkReponse)
  .then(checkSuccessField)
  .then(data => data.message)
  .catch(error => {
    throw new Error(error.message)
  })
  return message
}