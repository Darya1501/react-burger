import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useState, useContext, useMemo } from 'react'
import { OrderDetails } from '../modals/order-details';
import styles from './burger-constructor.module.css'
import { OrderContext } from '../../context/burger-context';
import { postOrder } from '../../utils/burger-api';
import { useSelector } from 'react-redux';

export const BurgerConstructor = () => {
  const { ingredientsRequest, ingredientsFailed, constructorBun, constructorIngredients } = useSelector(state => state.ingredients);

  const [ isDetailsOpen, setIsDetailsOpen ] = useState(false);
  const [ totalPrice, setTotalPrice ] = useState(0);
  const { setOrderData } = useContext(OrderContext)

  useMemo(() => {
    setTotalPrice(constructorIngredients.reduce((accumulator, component) => accumulator + component.price, constructorBun.price * 2))
  }, [constructorBun, constructorIngredients])

  const createOrder = async () => {
    const ingredients = [constructorBun._id];
    constructorIngredients.map(component => ingredients.push(component._id))
    const orderID = await postOrder(ingredients);
    setOrderData({ id: orderID })
    setIsDetailsOpen(true)
  }
  
  return (
    <div className={styles.container}>
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
                  <div key={ingredient._id} className={styles.choice}>
                    <DragIcon className='mr-2' />
                    <ConstructorElement
                      text={ingredient.name}
                      price={ingredient.price}
                      thumbnail={ingredient.image}
                      extraClass='ml-2'
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
      {isDetailsOpen && <OrderDetails onClose={() => setIsDetailsOpen(false)} />}
    </div>
  )
}