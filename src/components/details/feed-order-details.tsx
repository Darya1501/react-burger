import React, { useEffect } from 'react'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './details.module.css'
import { useDispatch, useSelector } from '../../hooks/store-hooks';
import { getOrderRequest } from '../../services/actions/order';
import { useParams } from 'react-router-dom';
import { TIngredient } from '../../utils/types';

type TModalIngredient = {
  id: string
  name: string
  image: string
  price: number
}

const getIngredientsPrice = (ingredients: Array<TModalIngredient>) => {
  return ingredients.reduce((accumulator: number, component: TModalIngredient) => accumulator + component.price, 0);
}
const getCountIngredientsInOrder = (ingredients: Array<string>, ingredientId: string): number => {
  return ingredients.filter((item: string) => item === ingredientId).length;
};

const getAllIngredient = (ingredients: Array<TIngredient>, ids: Array<string>) => {
  const orderIngredients = ingredients.filter((ingredient: TIngredient) => ids.indexOf(ingredient._id) !== -1)
  return orderIngredients.map((ingredient: TIngredient) => ({
    id: ingredient._id,
    name: ingredient.name,
    image: ingredient.image,
    price: ingredient.type === 'bun' ? ingredient.price * 2 : ingredient.price
  }))
}

export const FeedOrderDetails = () => {
  const { ingredients } = useSelector(state => state.ingredients);
  const { id } = useParams<{id: string}>();
  const { feedOrder } = useSelector(store => store.order)

  const dispatch = useDispatch()
  useEffect(
    () => {
      dispatch(getOrderRequest(id))
    },
    [dispatch, id]
  );


  return (
      <div className={styles.allOrder}>
        {feedOrder && (
          <>
          <p className={`${styles.number} text text_type_digits-default mb-10`}>#{feedOrder.number}</p>

          <p className="text text_type_main-medium mb-3">{feedOrder.name}</p>
          <p className="text text_type_main-default mb-15">
            {
              feedOrder.status === 'created' ? 'Создан' : feedOrder.status === 'pending' ? 'Готовится' : 'Выполнен'
            }
          </p>

          <p className="text text_type_main-medium mb-6">Состав:</p>

          <div className={styles.list}>
            {
              getAllIngredient(ingredients, feedOrder.ingredients).map(ingredient => (
                <div className={styles.item} key={ingredient.id}>
                  <div className={styles.image}>
                    <img src={ingredient.image} alt="bun" />
                  </div>
                  <p className="text text_type_main-default">{ingredient.name}</p>
                  <p className={`${styles.price} text text_type_digits-default`}>
                    {getCountIngredientsInOrder(feedOrder.ingredients, ingredient.id)} x {ingredient.price}
                    <CurrencyIcon type="primary" />
                  </p>
                </div>
              ))
            }

          </div>

          <div className={styles.bottom}>
            <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(feedOrder.createdAt)} />
            <p className={`${styles.price} text text_type_digits-default`}>
              {getIngredientsPrice(getAllIngredient(ingredients, feedOrder.ingredients))}
                <CurrencyIcon type="primary" />
              </p>
          </div>
          </>
        )}
      </div>
  )
}