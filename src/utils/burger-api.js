const API = 'https://norma.nomoreparties.space/api';

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = async () => {
  const response = await fetch(`${API}/ingredients`)
    .then(checkReponse)
    .then(data => {
      if (data.success) {
        return data.data
      } else {
        Promise.reject("Success field is not equal true")
      }
    })
    .catch(error => {
      throw new Error("Success field is not equal true")
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
  .then(data => {
    if (data.success) {
      return data.order.number
    } else {
      Promise.reject("Success field is not equal true")
    }
  })
  .catch(error => {
    throw new Error("Success field is not equal true")
  })

  return orderID
}