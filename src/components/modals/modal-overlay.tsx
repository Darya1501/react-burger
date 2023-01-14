import React from 'react'
import styles from './modal.module.css'

type TModalOverlayProps = {
  onClose: () => void
}

export const ModalOverlay = ({ onClose } : TModalOverlayProps) => {
  return (
    <div className={styles.overlay} onClick={onClose}></div>
  )
}