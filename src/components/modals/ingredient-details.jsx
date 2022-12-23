import React from 'react'
import styles from './modal.module.css'
import { useSelector } from 'react-redux';

export const IngredientDetails = () => {
  const { currentViewedIngredient } = useSelector(store => store.modal);
  return (
    <div className={styles.ingredient}>
      <img src={currentViewedIngredient.image_large} alt={currentViewedIngredient.name} />
      <p className="text text_type_main-medium mb-8 mt-4">{currentViewedIngredient.name}</p>
      <div className={styles.info}>
        <div>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_main-default text_color_inactive">{currentViewedIngredient.calories}</p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_main-default text_color_inactive">{currentViewedIngredient.proteins}</p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_main-default text_color_inactive">{currentViewedIngredient.fat}</p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_main-default text_color_inactive">{currentViewedIngredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  )
}