import React from 'react'
import { Counter, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'
import { IngredientDetails } from '../modals/ingredient-details';
import { ingredientTypes } from '../../utils/prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { HIDE_INGREDIENT_DATA, SHOW_INGREDIENT_DATA } from '../../services/actions/modal';
import { useDrag } from 'react-dnd';
import { Modal } from '../modals/modal';


export const Ingredient = ({ item }) => {
  const { isIngredientModalVisible } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const [{ opacity }, ref] = useDrag({
    type: item.type === 'bun' ? 'bun' : 'ingredients',
    item: item,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <>
      {
        item && 
        <div 
          className={styles.ingredient} 
          onClick={() => dispatch({ type: SHOW_INGREDIENT_DATA, item })}
          ref={ref}
          style={{ opacity }}
        >
          {item.count > 0 && (<Counter count={item.count} size="default" extraClass="m-1" />)}
          <img src={item.image} alt={item.name} />
          <p className={`${styles.price} text text_type_digits-default`}>
            {item.price}
            <CurrencyIcon />
          </p>
          <p className="text text_type_main-default">{item.name}</p>
        </div>
      }
      {isIngredientModalVisible && (
        <Modal onClose={() => dispatch({ type: HIDE_INGREDIENT_DATA })} header='Детали ингредиента'>
          <IngredientDetails />
        </Modal>
        )}
    </>
  )
}

Ingredient.propTypes = {
  item: ingredientTypes
}; 