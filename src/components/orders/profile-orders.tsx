import React from 'react'
import styles from './orders.module.css'
import { OrderCard } from './order-card'
import { useSelector } from '../../hooks/store-hooks';

export const ProfileOrders = () => {
  const { orders } = useSelector(state => state.feed);

  return (
    <div className={styles.list}>
      { orders.map(order => (<OrderCard order={order} key={order._id} status={order.status} />)) }
    </div>
  )
}