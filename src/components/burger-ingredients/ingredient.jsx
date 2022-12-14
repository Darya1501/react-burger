import React from 'react'
import { Counter, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'
import { ingredientTypes } from '../../utils/prop-types';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';


export const Ingredient = ({ item }) => {
  const location = useLocation();

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
        <Link 
          to={{
            pathname: `/ingredients/${item._id}`,
            state: { background: location }
          }}
          className={styles.ingredient} 
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
        </Link>
      }
    </>
  )
}

Ingredient.propTypes = {
  item: ingredientTypes
}; 