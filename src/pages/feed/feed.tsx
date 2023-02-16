import React, { useEffect } from 'react'
import { FeedOrders } from '../../components/orders/feed-orders'
import { FeedStats } from '../../components/feed-stats/feed-stats'
import styles from './feed.module.css'
import { useDispatch } from '../../hooks/store-hooks'
import { WS_FEED_CONNECTION_START, WS_FEED_CONNECTION_CLOSE } from '../../services/constants/feed'
import { WS_FEED_API } from '../../utils/constants'

export const Feed = () => {
  const dispatch = useDispatch()

  useEffect(
    () => {
      dispatch({ type: WS_FEED_CONNECTION_START, payload: `${WS_FEED_API}/all` });
      return () => {
        dispatch({ type: WS_FEED_CONNECTION_CLOSE })
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
