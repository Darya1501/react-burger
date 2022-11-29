import React from 'react'
import styles from './burger-ingredients.module.css'
import { Ingredient } from './ingredient'
import PropTypes from 'prop-types';

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

const items = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
});

IngredientsCategory.propTypes = {
  refLink: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(items).isRequired
}; 
