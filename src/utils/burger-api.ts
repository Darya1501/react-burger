import { API } from "./constants";
import { getCookie, setCookie } from "./cookies";
import { TFeedOrder, TIngredient,TUser } from "./types";

type TOrderResponse ={
  number: number
}

type TResponse = {
  success: string,
  data?: Array<TIngredient>,
  order?: TOrderResponse,
  refreshToken?: string,
  accessToken?: string,
  user?: TUser,
  message?: string,
  orders?: Array<TFeedOrder>
}

type TRequestOptions = {
  method?: string,
  headers?: { [key: string]: string },
  body?: string
}


const checkReponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const checkSuccessField = (data: TResponse) => {
  return data.success ? data : Promise.reject("Success field is not equal true");
}

async function request(url: string, options?: TRequestOptions) {
  return await fetch(url, options)
  .then(checkReponse)
  .then(checkSuccessField)
}

const saveTokens = (refreshToken: string, accessToken: string) => {
  localStorage.setItem('refreshToken', refreshToken);
  setCookie('accessToken', accessToken.split('Bearer ')[1], {expires: 20 * 60 });
}

const deleteTokens = () => {
  localStorage.removeItem('refreshToken');
  setCookie('accessToken', '', {expires: -1 });
}


export const getIngredients = async () => {
  return request(`${API}/ingredients`)
    .then(data => data.data)
}

export const postOrder = async (order: Array<string>) => {
  const accessToken = getCookie('accessToken');

  return request(`${API}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    },
    body: JSON.stringify({ ingredients: order })
  })
  .then(data => data.order?.number)
}

export const createNewUser = async (user: TUser) => {
  return request(`${API}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...user })
  })
  .then(data => {
    saveTokens(data.refreshToken!, data.accessToken!)
    return data.user
  })
}

export const authorizeUser = async (user: TUser) => {
  return request(`${API}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...user })
  })
  .then(data => {
    saveTokens(data.refreshToken!, data.accessToken!)
    return data.user
  })
}

export const sendResetPasswordEmail = async (email: string) => {
  return request(`${API}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email })
  })
  .then(data => data.message)
}

export const resetUserPassword = async (password: string, token: string) => {
  return request(`${API}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password: password, token: token })
  })
  .then(data => data.message)
}

export const updateToken = async () => {
  const refreshToken =  localStorage.getItem('refreshToken');
  if (refreshToken) {
    return request(`${API}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: refreshToken })
    })
    .then(data => {
      saveTokens(data.refreshToken!, data.accessToken!)
      return data.accessToken
    })
  }
}

export const logout = async () => {
  const refreshToken =  localStorage.getItem('refreshToken');
  return request(`${API}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: refreshToken })
  })
  .then(deleteTokens)
}

export const getUser = async () => {
  const accessToken = getCookie('accessToken');
  const refreshToken =  localStorage.getItem('refreshToken');
  if (accessToken) {
    return request(`${API}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      }
    })
    .then(data => data.user)
  } else if (refreshToken) {
    await updateToken();
    getUser();
  }
}

export const changeUserInfo = async (data: TUser) => {
  const accessToken = getCookie('accessToken');
  return request(`${API}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    },
    body: JSON.stringify({ ...data }),
  })
  .then(data => data.user)
}

export const getOrderById = (id: string) => {
  return request(`${API}/orders/${id}`)
    .then(data => {
      return data.orders
    })
}