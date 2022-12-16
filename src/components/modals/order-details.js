import React from 'react'
import { Modal } from './modal'
import doneImage from '../../images/graphics.svg'
import styles from './modal.module.css'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export const OrderDetails = ({ onClose }) => {
  const { orderRequest, orderFailed, order } = useSelector(store => store.order);
  
  return (
    <Modal onClose={onClose}>
      {
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
      }
    </Modal>
  )
}

OrderDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
}; 