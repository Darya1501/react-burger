import React from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './details.module.css'

export const FeedOrderDetails = () => {
  return (
      <div className={styles.allOrder}>
        <p className={`${styles.number} text text_type_digits-default mb-10`}>#034533</p>

        <p className="text text_type_main-medium mb-3">Black Hole Singularity острый бургер</p>
        <p className="text text_type_main-default mb-15">Выполнен</p>

        <p className="text text_type_main-medium mb-6">Состав:</p>

        <div className={styles.list}>

          <div className={styles.item}>
            <div className={styles.image}>
              <img src="https://code.s3.yandex.net/react/code/bun-02.png" alt="bun" />
            </div>
            <p className="text text_type_main-default">Флюоресцентная булка R2-D3</p>
            <p className={`${styles.price} text text_type_digits-default`}>
              2 x 20
              <CurrencyIcon type="primary" />
            </p>
          </div>
          <div className={styles.item}>
            <div className={styles.image}>
              <img src="https://code.s3.yandex.net/react/code/bun-02.png" alt="bun" />
            </div>
            <p className="text text_type_main-default">Флюоресцентная булка R2-D3</p>
            <p className={`${styles.price} text text_type_digits-default`}>
              2 x 20
              <CurrencyIcon type="primary" />
            </p>
          </div>
          <div className={styles.item}>
            <div className={styles.image}>
              <img src="https://code.s3.yandex.net/react/code/bun-02.png" alt="bun" />
            </div>
            <p className="text text_type_main-default">Флюоресцентная булка R2-D3</p>
            <p className={`${styles.price} text text_type_digits-default`}>
              2 x 20
              <CurrencyIcon type="primary" />
            </p>
          </div>

        </div>

        <div className={styles.bottom}>
          <p className="text text_type_main-default text_color_inactive">Вчера, 13:50</p>
          <p className={`${styles.price} text text_type_digits-default`}>
              510
              <CurrencyIcon type="primary" />
            </p>
        </div>

      </div>
  )
}