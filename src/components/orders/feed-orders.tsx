import React from 'react'
import styles from './orders.module.css'
import { OrderCard } from './order-card'

export const FeedOrders = () => {
  return (
    <div className={`${styles.container} pt-10`}>
      <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
      <div className={styles.list}>
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </div>
    </div>
  )
}
