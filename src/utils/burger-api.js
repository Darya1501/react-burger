const API = 'https://norma.nomoreparties.space/api';

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = async () => {
  const response = await fetch(`${API}/ingredients`)
    .then(checkReponse)
    .then(data => data.success ? data.data : Promise.reject(`Success field is not equal`))
    .catch(error => console.error(error))
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
  .then(data => data.success ? data.order.number : Promise.reject(`Success field is not equal`))
  .catch(error => console.error(error))

  return orderID
}