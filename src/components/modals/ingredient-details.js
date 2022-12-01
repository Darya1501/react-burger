import React from 'react'
import { Modal } from './modal'
import styles from './modal.module.css'

export const IngredientDetails = props => {
  const { ingredient } = props;
  return (
    <Modal {...props} header='Детали ингредиента'>
      <div className={styles.ingredient}>
        <img src={ingredient.image_large} alt={ingredient.name} />
        <p className="text text_type_main-medium mb-8 mt-4">{ingredient.name}</p>
        <div className={styles.info}>
          <div>
            <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
            <p className="text text_type_main-default text_color_inactive">{ingredient.calories}</p>
          </div>
          <div>
            <p className="text text_type_main-default text_color_inactive">Белки, г</p>
            <p className="text text_type_main-default text_color_inactive">{ingredient.proteins}</p>
          </div>
          <div>
            <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
            <p className="text text_type_main-default text_color_inactive">{ingredient.fat}</p>
          </div>
          <div>
            <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
            <p className="text text_type_main-default text_color_inactive">{ingredient.carbohydrates}</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}
