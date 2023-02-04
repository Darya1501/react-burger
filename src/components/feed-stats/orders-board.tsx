import React from 'react'
import { useSelector } from '../../hooks/store-hooks';
import { TFeedOrder } from '../../services/reducers/feed';
import styles from './feed-stats.module.css';

export type TOrdersBoardType = {
  variant: 'done' | 'in work' 
}

const sortOrders = (orders: Array<TFeedOrder>) => {
  const done: Array<string> = [];
  const inWork: Array<string> = [];

  orders.forEach(order => {
    if (order.status === 'done') {
      done.push(order._id)
    } else {
      inWork.push(order._id)
    }
  })

  return { done, inWork }
}

export const OrdersBoard = ({ variant } : TOrdersBoardType) => {
  const { orders } = useSelector(state => state.feed);

  const { done, inWork } = sortOrders(orders);

  return (
    <div className={styles.board}>
      {
        variant === 'done' ? (
          <>
            <p className="text text_type_main-medium mb-6">Готовы</p>
            <div className={styles.done}>
              { done.slice(0, 10).map(id => (<p key={id} className="text text_type_digits-default mb-2">{id}</p>)) }
            </div>
          </>
        ) : (
          <>
            <p className="text text_type_main-medium mb-6">В работе</p>
            <div>
              { inWork.slice(0, 10).map(id => (<p key={id} className="text text_type_digits-default mb-2">{id}</p>)) }
            </div>
          </>
        )
      }
    </div>
  )
}
