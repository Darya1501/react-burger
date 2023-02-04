import React from 'react'
import { useSelector } from '../../hooks/store-hooks';

export type TOrdersBoardType = {
  variant: 'total' | 'totalToday' 
}

export const OrdersCompleated = ({variant} : TOrdersBoardType) => {
  const { total, totalToday } = useSelector(state => state.feed);

  return (
    <div className="mb-15">
      <p className="text text_type_main-medium mb-6">
        { variant === 'total' ? 'Выполнено за всё время:' : 'Выполнено за сегодня:' }
      </p>
      <p className="text text_type_digits-large">{variant === 'total' ? total : totalToday}</p>
    </div>
  )
}
