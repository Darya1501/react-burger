import React from 'react'
import { Counter, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css'

export const Ingredient = ({item}) => {
  return (
    <div className={styles.ingredient}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img src={item.image} alt={item.name} />
      <p className={`${styles.price} text text_type_digits-default`}>
        {item.price}
        <CurrencyIcon />
      </p>
      <p className="text text_type_main-default">{item.name}</p>
    </div>
  )
}
