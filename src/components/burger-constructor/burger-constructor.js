import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useState, useContext, useMemo } from 'react'
import { OrderDetails } from '../modals/order-details';
import styles from './burger-constructor.module.css'
import { IngredientsContext, OrderContext } from '../../context/burger-context';
import { postOrder } from '../../utils/burger-api';

export const BurgerConstructor = () => {
  const { bun, components } = useContext(IngredientsContext);
  const [ isDetailsOpen, setIsDetailsOpen ] = useState(false);
  const [ totalPrice, setTotalPrice ] = useState(0);
  const { setOrderData } = useContext(OrderContext)

  useMemo(() => {
    setTotalPrice(components.reduce((accumulator, component) => accumulator + component.price, bun.price * 2))
  }, [bun, components])

  const createOrder = async () => {
    const ingredients = [bun._id];
    components.map(component => ingredients.push(component._id))
    const orderID = await postOrder(ingredients);
    setOrderData({ id: orderID })
    setIsDetailsOpen(true)
  }
  
  return (
    <div className={styles.container}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${bun.name} (верх)`}
        price={bun.price}
        thumbnail={bun.image}
        extraClass='mb-4 ml-8 mr-4'
      />

      <div className={styles.choices}>
        { components.map( component => (
          <div key={component._id} className={styles.choice}>
            <DragIcon className='mr-2' />
            <ConstructorElement
              text={component.name}
              price={component.price}
              thumbnail={component.image}
              extraClass='ml-2'
            />
          </div>
        )) }
      </div>

      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${bun.name} (низ)`}
        price={bun.price}
        thumbnail={bun.image}
        extraClass='mt-4 ml-8 mr-4'
      />

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