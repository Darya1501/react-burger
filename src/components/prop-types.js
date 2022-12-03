import { PropTypes } from "prop-types";

const ingredientTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
}).isRequired

const menuCategoryTypes = PropTypes.arrayOf(ingredientTypes).isRequired

const menuTypes = PropTypes.shape({
  buns: menuCategoryTypes,
  sauces: menuCategoryTypes,
  mains: menuCategoryTypes
}).isRequired


export { ingredientTypes, menuCategoryTypes, menuTypes }