import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { useHistory, useLocation } from 'react-router-dom';

import { getOrderNumber, TOGGLE_ORDER_DATA } from '../../services/actions/order';
import { addConstructorIngredient, CHANGE_CONSTRUCTOR_BUN } from '../../services/actions/constructor';
import { CHANGE_BUNS_COUNT, INCREMENT_IGREDIENT_COUNT } from '../../services/actions/ingredients';

import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'

import { ConstructorIngredient } from './constructor-ingredient';
import { OrderDetails } from '../modals/order-details';
import { Modal } from '../modals/modal';

export const BurgerConstructor = () => {
  const { ingredientsFailed } = useSelector(state => state.ingredients);
  const { constructorBun, constructorIngredients } = useSelector(state => state.constructors);
  const { isUserAuthorized } = useSelector(store => store.user);
  const { isOrderModalVisible } = useSelector(state => state.order);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation()

  const [ totalPrice, setTotalPrice ] = useState(0);

  useMemo(() => {
    if (!constructorBun || !constructorIngredients.length) return 0;
    setTotalPrice(constructorIngredients.reduce((accumulator, component) => accumulator + component.price, constructorBun.price * 2))
  }, [constructorBun, constructorIngredients])

  const createOrder = () => {
    if (!isUserAuthorized) history.push({ pathname: '/login', state: { from: location } });
    if (!constructorBun || !constructorIngredients.length) return;
    const ingredients = [constructorBun._id];
    constructorIngredients.map(component => ingredients.push(component._id));
    ingredients.push(constructorBun._id);
    dispatch(getOrderNumber(ingredients))
  }

  const [, ingredientDropTarget] = useDrop({
    accept: ['bun', 'ingredients'],
    drop(item) {
      if (item.type === 'bun') {
        dispatch({ type: CHANGE_CONSTRUCTOR_BUN, bun: item })
        dispatch({ type: CHANGE_BUNS_COUNT, bun: item })
      } else {
        dispatch(addConstructorIngredient(item))
        dispatch({ type: INCREMENT_IGREDIENT_COUNT, ingredient: item })
      }
    }
  });

  return (
    <div className={styles.container} ref={ingredientDropTarget} >
      {
        !ingredientsFailed ?
        (
          <>
            {constructorBun && <ConstructorElement
              type="top"
              isLocked={true}
              text={`${constructorBun.name} (верх)`}
              price={constructorBun.price}
              thumbnail={constructorBun.image}
              extraClass='mb-4 ml-8 mr-4'
            />}

            <div className={styles.choices}>
              { constructorIngredients.length ? 
                ( constructorIngredients.map( (ingredient, index) => (
                  <ConstructorIngredient key={ingredient.constructorID} ingredient={ingredient} index={index} />
                )) ) : (
                  <p className="text text_type_main-default">
                    Перетащите ингредиенты сюда
                  </p>
                )
              }
            </div>

            {constructorBun && <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${constructorBun.name} (низ)`}
              price={constructorBun.price}
              thumbnail={constructorBun.image}
              extraClass='mt-4 ml-8 mr-4'
            />}
          </>
        ) : ( <p className="text text_type_main-medium">Что-то пошло не так</p> )
      }

      {constructorIngredients.length ?
        (
          <div className={styles.bottom}>
            <p className={`${styles.price} text text_type_digits-medium`}>
              {totalPrice}
              <CurrencyIcon />
            </p>
            <Button htmlType="button" type="primary" size="medium" extraClass="ml-2" onClick={createOrder}>
              Оформить заказ
            </Button>
          </div>
        ) : null
      }

      {isOrderModalVisible && (
        <Modal onClose={() => dispatch({ type: TOGGLE_ORDER_DATA })}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  )
}