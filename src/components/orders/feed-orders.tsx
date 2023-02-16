import React from 'react'
import styles from './orders.module.css'
import { OrderCard } from './order-card'
import { useSelector } from '../../hooks/store-hooks';
import { TFeedOrder } from '../../utils/types';

export const FeedOrders = () => {
  const { orders } = useSelector(state => state.feed);

  return (
    <div className={`${styles.container} pt-10`}>
      <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
      <div className={styles.list}>
        
        {orders.map((order: TFeedOrder) => (<OrderCard order={order} key={order._id} />))}
      </div>
    </div>
  )
}
