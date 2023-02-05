import React, { FC, ReactElement, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { ESC_KEYCODE } from '../../utils/constants';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalOverlay } from './modal-overlay'
import styles from './modal.module.css'

type TModalProps = {
  header?: string,
  children: ReactElement,
  onClose: () => void
}

export const Modal: FC<TModalProps> = ({ header, children, onClose }) => {
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if(event.keyCode === ESC_KEYCODE){
        onClose()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [onClose])

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}><CloseIcon type='primary'/></button>
        {header && (<p className='text text_type_main-medium'>{header}</p>)}
        <div className={`${styles.content}`}>{children}</div>
      </div>
    </>, document.getElementById('react-modals')!
  )
}