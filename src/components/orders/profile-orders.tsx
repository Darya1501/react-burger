import React from 'react'
import styles from './orders.module.css'
import { OrderCard } from './order-card'
import { useSelector } from '../../hooks/store-hooks';
import { TFeedOrder } from '../../utils/types';

export const ProfileOrders = () => {
  const { orders } = useSelector(state => state.profileFeed);

  return (
    <div className={styles.list}>
      { orders.map((order: TFeedOrder) => (<OrderCard order={order} key={order._id} status={order.status} />)) }
    </div>
  )
}