import React from 'react'
import styles from './modal.module.css'

export const ModalOverlay = props => {
  return (
    <div className={styles.overlay} onClick={props.onClose}>
      {props.children}
    </div>
  )
}
