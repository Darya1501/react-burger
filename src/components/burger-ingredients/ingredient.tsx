import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';

import { TIngredient } from '../../utils/types';

import { Counter, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'

type TIngredientProps = {
  item: TIngredient,
}

export const Ingredient: FC<TIngredientProps> = ({ item }) => {
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
            <CurrencyIcon type="primary" />
          </p>
          <p className="text text_type_main-default">{item.name}</p>
        </Link>
      }
    </>
  )
}