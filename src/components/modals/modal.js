import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom';
import { ModalOverlay } from './modal-overlay'
import styles from './modal.module.css'
import PropTypes from 'prop-types';

export const Modal = ({ isOpen, header, children, onClose }) => {
  useEffect(() => {
    const close = (e) => {
      if(e.keyCode === 27){
        onClose()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [onClose])

  return ReactDOM.createPortal(
    <>
      {isOpen ?
        (<>
          <ModalOverlay onClose={onClose} />
          <div className={styles.modal}>
            <button className={styles.close} onClick={onClose}><CloseIcon/></button>
            {header && <p className='text text_type_main-medium'>{header}</p>}
            <div className={`${styles.content} custom-scroll`}>{children}</div>
          </div>
          </>) : null
      }
    </>, document.getElementById('react-modals')
  )
}


Modal.propTypes = {
  isOpen: PropTypes.bool,
  header: PropTypes.string,
  onClose: PropTypes.func,
}; 