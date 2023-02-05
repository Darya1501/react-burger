import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from '../../hooks/store-hooks';
import { TFeedOrder } from '../../services/reducers/feed';
import { TIngredient } from '../../utils/types';
import styles from './orders.module.css'

type TOrderCardProps = {
  order: TFeedOrder,
  status?: string
}

type TCardIngredient = {
  id: string
  image: string
  price: number
}

const getAllIngredient = (ingredients: Array<TIngredient>, ids: Array<string>) => {
  const orderIngredients = ingredients.filter((ingredient: TIngredient) => ids.indexOf(ingredient._id) !== -1)
  return orderIngredients.map((ingredient: TIngredient) => ({
    id: ingredient._id,
    image: ingredient.image,
    price: ingredient.type === 'bun' ? ingredient.price * 2 : ingredient.price
  }))
}

export const OrderCard: FC<TOrderCardProps> = ({ order, status }) => {
  const location = useLocation();
  
  const { ingredients } = useSelector(state => state.ingredients);
  const orderIngredients = getAllIngredient(ingredients, order.ingredients)

  const totalPrice = orderIngredients.reduce((accumulator: number, component: TCardIngredient) => accumulator + component.price, 0);

  return (
    <Link 
      to={{
        pathname: `${location.}/${order.number}`,
        state: { background: location }
      }}
      className={`${styles.card} p-6`}
    >

      <div className={styles.id}>
        <span className="text text_type_digits-default">#{order.number}</span>
        <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(order.createdAt)} />
      </div>
      <p className="text text_type_main-medium mt-6 mb-6">
        {order.name}
        { status &&
          (<>
            <br />
            <span className="text text_type_main-default mt-2">
              {
                status === 'created' ? 'Создан' : status === 'pending' ? 'Готовится' : 'Выполнен'
              }
            </span>
          </>)
          }
      </p>

      <div className={styles.components}>
        <div className={styles.ingredients}>
          {
            orderIngredients.slice(0, 6).map((ingredient, index) => {
              if (index < 5) {
                return (
                  <div className={styles.image} style={{ zIndex: 6-index }} key={ingredient.id}>
                    <img src={ingredient.image} alt={ingredient.id} />
                  </div>
                )
              } else {
                return (
                  <div className={styles.image} style={{ zIndex: 1 }} key={ingredient.id}>
                    <img src={ingredient.image} alt={ingredient.id} />
                    <p className="text text_type_digits-default">+{order.ingredients.length - 5}</p>
                  </div> 
                )
              }
            })
          }
        </div>

        <p className={`${styles.price} text text_type_digits-medium`}>
          {totalPrice}
          <CurrencyIcon type="primary" />
        </p>
      </div>

    </Link>
  )
}
