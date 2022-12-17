import React from 'react'
import doneImage from '../../images/graphics.svg'
import styles from './modal.module.css'
import { useSelector } from 'react-redux';

export const OrderDetails = () => {
  const { orderRequest, orderFailed, order } = useSelector(store => store.order);
  
  return (
    orderRequest ? (
      <p className="text text_type_main-medium">Загрузка...</p>
    ) : orderFailed ? (
      <p className="text text_type_main-medium">Что-то пошло не так</p>
    ) : (
      <div className={styles.order}>
        <p className="text text_type_digits-large mb-8">{order.id}</p>
        <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
        <img src={doneImage} alt='done!' className="mb-15" />
        <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
      </div>
    )
  )
}