import React from 'react'
import { Counter, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'
import { IngredientDetails } from '../modals/ingredient-details';
import { ingredientTypes } from '../../utils/prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { HIDE_INGREDIENT_DATA, SHOW_INGREDIENT_DATA } from '../../services/actions';


export const Ingredient = ({ item }) => {
  const { isIngredientModalVisible } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  return (
    <>
      {
        item && <div className={styles.ingredient} onClick={() => dispatch({ type: SHOW_INGREDIENT_DATA, item })}>
          <Counter count={1} size="default" extraClass="m-1" />
          <img src={item.image} alt={item.name} />
          <p className={`${styles.price} text text_type_digits-default`}>
            {item.price}
            <CurrencyIcon />
          </p>
          <p className="text text_type_main-default">{item.name}</p>
        </div>
      }
      {isIngredientModalVisible && <IngredientDetails onClose={() => dispatch({ type: HIDE_INGREDIENT_DATA })} />}
    </>
  )
}

Ingredient.propTypes = {
  item: ingredientTypes
}; 