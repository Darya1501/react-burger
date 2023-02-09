import React from 'react'
import styles from './feed-stats.module.css';

import { OrdersBoard } from './orders-board';
import { OrdersCompleated } from './orders-compleated';

export const FeedStats = () => {
  return (
    <div className={styles.container}>
      <div className={styles.orders}>
        <OrdersBoard variant='done' />
        <OrdersBoard variant='in work' />
      </div>
      <OrdersCompleated variant='total' />
      <OrdersCompleated variant='totalToday' />
    </div>
  )
}
