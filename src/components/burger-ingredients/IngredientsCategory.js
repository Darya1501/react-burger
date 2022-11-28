import React from 'react'
import styles from './BurgerIngredients.module.css'
import { Ingredient } from './Ingredient'

export const IngredientsCategory = ({ refLink, category, ingredients }) => {
  return(
    <div>
      <p ref={refLink} className="text text_type_main-medium">
        {category}
      </p>

      <div className={`${styles.category} p-4 pt-6 pb-10`}>
        {ingredients.map(item => (
          <Ingredient item={item} key={item._id} />
        ))}
      </div>
    </div>
  )
}