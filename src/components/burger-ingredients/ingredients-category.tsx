import React, { RefObject } from 'react'
import { TIngredient } from '../../utils/types';

import { Ingredient } from './ingredient'
import styles from './burger-ingredients.module.css'

type TIngredientsCategoryProps = {
  refLink: RefObject<HTMLDivElement>,
  category: string,
  ingredients: TIngredient[],
}

export const IngredientsCategory = ({ refLink, category, ingredients }: TIngredientsCategoryProps) => {
  return(
    <div ref={refLink} >
      <p className="text text_type_main-medium">
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