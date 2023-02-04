import React, { useEffect } from 'react'
import { FeedOrders } from '../../components/orders/feed-orders'
import { FeedStats } from '../../components/feed-stats/feed-stats'
import styles from './feed.module.css'
import { useDispatch } from '../../hooks/store-hooks'
import { WS_FEED_ORDERS_CONNECT, WS_FEED_ORDERS_DISCONNECT } from '../../services/constants/feed'

export const Feed = () => {
  const dispatch = useDispatch()

  useEffect(
    () => {
      dispatch({ type: WS_FEED_ORDERS_CONNECT });
      return () => {
        dispatch({ type: WS_FEED_ORDERS_DISCONNECT })
      }
    },
    [dispatch]
  );

  return (
    <div className={styles.container}>
      <FeedOrders />
      <FeedStats />
    </div>
  )
}
