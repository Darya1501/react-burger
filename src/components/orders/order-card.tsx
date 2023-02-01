import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import styles from './orders.module.css'

export const OrderCard = () => {
  const location = useLocation();

  const totalPrice = 480;
  const count = 15;
  const id = 1;

  return (
    <Link 
      to={{
        pathname: `${location.pathname}/${id}`,
        state: { background: location }
      }}
      className={`${styles.card} p-6`}
    >

      <div className={styles.id}>
        <span className="text text_type_digits-default">#034535</span>
        <span className='text text_type_main-default text_color_inactive'>Сегодня, 16:20</span>
      </div>
      <p className="text text_type_main-medium mt-6 mb-6">Death Star Starship Main бургер</p>

      <div className={styles.components}>
        <div className={styles.ingredients}>
          <div className={styles.image} style={{ zIndex: 5 }}>
            <img src="https://code.s3.yandex.net/react/code/bun-02.png" alt="bun" />
          </div> 
          <div className={styles.image} style={{ zIndex: 4 }}>
            <img src="https://code.s3.yandex.net/react/code/bun-01.png" alt="bun" />
          </div> 
          <div className={styles.image} style={{ zIndex: 3 }}>
            <img src="https://code.s3.yandex.net/react/code/bun-01.png" alt="bun" />
          </div> 
          <div className={styles.image} style={{ zIndex: 2 }}>
            <img src="https://code.s3.yandex.net/react/code/bun-01.png" alt="bun" />
          </div> 
          <div className={styles.image} style={{ zIndex: 1 }}>
            <img src="https://code.s3.yandex.net/react/code/bun-01.png" alt="bun" />
            <p className="text text_type_digits-default">+{count - 5}</p>
          </div> 
        </div>

        <p className={`${styles.price} text text_type_digits-medium`}>
          {totalPrice}
          <CurrencyIcon type="primary" />
        </p>
      </div>

    </Link>
  )
}
