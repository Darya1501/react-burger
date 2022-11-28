import React from 'react'
import { Counter, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css'
import PropTypes from 'prop-types';

export const Ingredient = ({ item }) => {
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

Ingredient.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired
}; 
