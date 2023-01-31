import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { FeedOrders } from '../../components/feed-orders/feed-orders'
import styles from './feed.module.css'

export const Feed = () => {
  return (
    <div className={styles.container}>
      <DndProvider backend={HTML5Backend}>
        <FeedOrders />
      </DndProvider>
    </div>
  )
}
