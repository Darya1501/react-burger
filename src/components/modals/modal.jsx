import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom';
import { ModalOverlay } from './modal-overlay'
import styles from './modal.module.css'
import PropTypes from 'prop-types';

const ESC_KEYCODE = 27

export const Modal = ({ header, children, onClose }) => {
  useEffect(() => {
    const close = (e) => {
      if(e.keyCode === ESC_KEYCODE){
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
        <button className={styles.close} onClick={onClose}><CloseIcon/></button>
        {header && (<p className='text text_type_main-medium'>{header}</p>)}
        <div className={`${styles.content} custom-scroll`}>{children}</div>
      </div>
    </>, document.getElementById('react-modals')
  )
}

Modal.propTypes = {
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}; 