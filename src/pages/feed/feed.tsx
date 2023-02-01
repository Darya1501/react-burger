import React from 'react'
import { FeedOrders } from '../../components/orders/feed-orders'
import { FeedStats } from '../../components/feed-stats/feed-stats'
import styles from './feed.module.css'

export const Feed = () => {
  return (
    <div className={styles.container}>
      <FeedOrders />
      <FeedStats />
    </div>
  )
}
