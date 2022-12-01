import React from 'react'
import styles from './modal.module.css'
import PropTypes from 'prop-types';

export const ModalOverlay = props => {
  return (
    <div className={styles.overlay} onClick={props.onClose}>
      {props.children}
    </div>
  )
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
}; 