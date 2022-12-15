import React, { useState } from 'react'
import { Counter, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'
import { IngredientDetails } from '../modals/ingredient-details';
import { ingredientTypes } from '../../utils/prop-types';


export const Ingredient = ({ item }) => {
  const [ isDetailsOpen, setIsDetailsOpen ] = useState(false);
  return (
    <>
      {
        item && <div className={styles.ingredient} onClick={() => setIsDetailsOpen(true)}>
          <Counter count={1} size="default" extraClass="m-1" />
          <img src={item.image} alt={item.name} />
          <p className={`${styles.price} text text_type_digits-default`}>
            {item.price}
            <CurrencyIcon />
          </p>
          <p className="text text_type_main-default">{item.name}</p>
        </div>
      }
      {isDetailsOpen && <IngredientDetails onClose={() => setIsDetailsOpen(false)} ingredient={item} />}
    </>
  )
}

Ingredient.propTypes = {
  item: ingredientTypes
}; 