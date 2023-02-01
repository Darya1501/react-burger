import React from 'react'
import styles from './orders.module.css'
import { OrderCard } from './order-card'

export const ProfileOrders = () => {
  return (
    <div className={styles.list}>
      <OrderCard />
      <OrderCard />
      <OrderCard />
    </div>
  )
}
