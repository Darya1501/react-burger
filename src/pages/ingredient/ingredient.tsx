import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './ingredient.module.css'
import { TIngredient } from '../../utils/types';

export const Ingredient = () => {
  //@ts-ignore
  const { ingredients, ingredientsRequest } = useSelector(state => state.ingredients);
  const { id } = useParams<{id?: string}>();
  const currentIngredient = ingredients.find((item: TIngredient) => item._id === id)

  return (
    <div className={styles.container}>
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
  </div>
  )
}
