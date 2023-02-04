import React from 'react'
import styles from './orders.module.css'
import { OrderCard } from './order-card'

export const ProfileOrders = () => {

  const order = {
    createdAt: "2023-02-04T17:04:15.496Z",
    ingredients: ['60d3b41abdacab0026a733c6'],
    name: "Краторный бургер",
    number: 39258,
    status: "done",
    updatedAt: "2023-02-04T17:04:15.888Z",
    _id: "63de900f936b17001be58ec8"
  }

  return (
    <div className={styles.list}>
      <OrderCard order={order} />
    </div>
  )
}
