import React, { useState } from 'react'
import { Counter, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'
import PropTypes from 'prop-types';
import { IngredientDetails } from '../modals/ingredient-details';

export const Ingredient = ({ item }) => {
  const [ details, setDetails ] = useState(false);
  return (
    <>
      <div className={styles.ingredient} onClick={() => setDetails(true)}>
        <Counter count={1} size="default" extraClass="m-1" />
        <img src={item.image} alt={item.name} />
        <p className={`${styles.price} text text_type_digits-default`}>
          {item.price}
          <CurrencyIcon />
        </p>
        <p className="text text_type_main-default">{item.name}</p>
      </div>
      <IngredientDetails isOpen={details} onClose={() => setDetails(false)} ingredient={item} />
    </>
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
