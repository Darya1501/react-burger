import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getIngredientsRequest } from '../services/actions/ingredients';
import styles from './ingredient.module.css'

export const Ingredient = () => {
  const { ingredients, ingredientsRequest } = useSelector(state => state.ingredients);
  console.log('ingredientsRequest: ', ingredientsRequest);
  const dispatch = useDispatch();

  let { id } = useParams();
  const currentIngredient = ingredients.find(item => item._id === id)

  useEffect(
    () => {
      dispatch(getIngredientsRequest());
    },
    [dispatch]
  );

  return (
    <>
    {
      ingredientsRequest ? 
        (<p className="text text_type_main-medium">Загрузка...</p>) :
        (<div className={styles.ingredient}>
          <img src={currentIngredient.image_large} alt={currentIngredient.name} />
          <p className="text text_type_main-medium mb-8 mt-4">{currentIngredient.name}</p>
          <div className={styles.info}>
            <div>
              <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
              <p className="text text_type_main-default text_color_inactive">{currentIngredient.calories}</p>
            </div>
            <div>
              <p className="text text_type_main-default text_color_inactive">Белки, г</p>
              <p className="text text_type_main-default text_color_inactive">{currentIngredient.proteins}</p>
            </div>
            <div>
              <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
              <p className="text text_type_main-default text_color_inactive">{currentIngredient.fat}</p>
            </div>
            <div>
              <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
              <p className="text text_type_main-default text_color_inactive">{currentIngredient.carbohydrates}</p>
            </div>
          </div>
        </div>)
    }
  </>
  )
}
