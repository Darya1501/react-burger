import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useState } from 'react'
import { OrderDetails } from '../modals/order-details';
import styles from './burger-constructor.module.css'
import { ingredientTypes, menuCategoryTypes } from '../prop-types';

export const BurgerConstructor = ({ bun, sauces, mains  }) => {
  const [ components ] = useState([
    sauces[2],
    mains[0],
    mains[1],
    mains[2],
  ]);

  const [ isDetailsOpen, setIsDetailsOpen ] = useState(false);
  
  return (
    <div className={styles.container}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
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
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={bun.image}
        extraClass='mt-4 ml-8 mr-4'
      />  

      <div className={styles.bottom}>
        <p className={`${styles.price} text text_type_digits-medium`}>
          610
          <CurrencyIcon />
        </p>
        <Button htmlType="button" type="primary" size="medium" extraClass="ml-2" onClick={() => setIsDetailsOpen(true)}>
          Оформить заказ
        </Button>
      </div>
      {isDetailsOpen && <OrderDetails onClose={() => setIsDetailsOpen(false)} />}
    </div>
  )
}

BurgerConstructor.propTypes = {
  bun: ingredientTypes,
  sauces: menuCategoryTypes,
  mains: menuCategoryTypes
}; 