import React from 'react'

export type TOrdersBoardType = {
  variant: 'total' | 'totalToday' 
}

export const OrdersCompleated = ({variant} : TOrdersBoardType) => {
  return (
    <div className="mb-15">
      <p className="text text_type_main-medium mb-6">
        { variant === 'total' ? 'Выполнено за всё время:' : 'Выполнено за сегодня:' }
      </p>
      <p className="text text_type_digits-large">28 752</p>
    </div>
  )
}
