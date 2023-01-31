import React from 'react'
import styles from './feed-stats.module.css';

export type TOrdersBoardType = {
  variant: 'done' | 'in work' 
}

export const OrdersBoard = ({ variant } : TOrdersBoardType) => {
  return (
    <div className={styles.board}>
      <p className="text text_type_main-medium mb-6">
        {variant === 'done' ? 'Готовы' : 'В работе'}:
      </p>
      <div className={variant === 'done' ? styles.done : ''}>
        <p className="text text_type_digits-default mb-2">034533</p>
        <p className="text text_type_digits-default mb-2">034533</p>
        <p className="text text_type_digits-default mb-2">034533</p>
        <p className="text text_type_digits-default mb-2">034533</p>
      </div>
    </div>
  )
}
