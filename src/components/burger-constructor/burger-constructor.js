import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useState, useMemo } from 'react'
import { OrderDetails } from '../modals/order-details';
import styles from './burger-constructor.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CONSTRUCTOR_INGREDIENT, CHANGE_CONSTRUCTOR_BUN, getOrderNumber, REMOVE_CONSTRUCTOR_INGREDIENT, TOGGLE_ORDER_DATA } from '../../services/actions';
import { useDrop } from 'react-dnd';

export const BurgerConstructor = () => {
  const { ingredientsRequest, ingredientsFailed, constructorBun, constructorIngredients } = useSelector(state => state.ingredients);
  const { isOrderModalVisible } = useSelector(state => state.order);
  const dispatch = useDispatch();

  const [ totalPrice, setTotalPrice ] = useState(0);

  useMemo(() => {
    setTotalPrice(constructorIngredients.reduce((accumulator, component) => accumulator + component.price, constructorBun.price * 2))
  }, [constructorBun, constructorIngredients])

  const createOrder = () => {
    const ingredients = [constructorBun._id];
    constructorIngredients.map(component => ingredients.push(component._id));
    dispatch(getOrderNumber(ingredients))
  }

  const [, ingredientDropTarget] = useDrop({
    accept: ['bun', 'ingredients'],
    drop(item) {
      if (item.type === 'bun') {
        dispatch({
          type: CHANGE_CONSTRUCTOR_BUN,
          bun: item
        })
      } else {
        dispatch({
          type: ADD_CONSTRUCTOR_INGREDIENT,
          ingredient: item
        })
      }
    }
  });

  const onDelete = (_id, constructorID) => {
    dispatch({
      type: REMOVE_CONSTRUCTOR_INGREDIENT,
      _id, constructorID
    })

  }
  
  return (
    <div className={styles.container} ref={ingredientDropTarget}>
      {
        !ingredientsRequest && !ingredientsFailed && 
        (
          <>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${constructorBun.name} (верх)`}
              price={constructorBun.price}
              thumbnail={constructorBun.image}
              extraClass='mb-4 ml-8 mr-4'
            />

            <div className={styles.choices}>
              { constructorIngredients.length ? 
                ( constructorIngredients.map( ingredient => (
                  <div key={ingredient.constructorID} className={styles.choice}>
                    <DragIcon className='mr-2' />
                    <ConstructorElement
                      text={ingredient.name}
                      price={ingredient.price}
                      thumbnail={ingredient.image}
                      extraClass='ml-2'
                      handleClose={() => onDelete(ingredient._id, ingredient.constructorID)}
                    />
                  </div>
                )) ) : (
                  <p className="text text_type_main-default">
                    Перетащите ингредиенты сюда
                  </p>
                )
              }
            </div>

            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${constructorBun.name} (низ)`}
              price={constructorBun.price}
              thumbnail={constructorBun.image}
              extraClass='mt-4 ml-8 mr-4'
            />
          </>
        )
      }

      <div className={styles.bottom}>
        <p className={`${styles.price} text text_type_digits-medium`}>
          {totalPrice}
          <CurrencyIcon />
        </p>
        <Button htmlType="button" type="primary" size="medium" extraClass="ml-2" onClick={createOrder}>
          Оформить заказ
        </Button>
      </div>
      {isOrderModalVisible && <OrderDetails onClose={() => dispatch({ type: TOGGLE_ORDER_DATA })} />}
    </div>
  )
}