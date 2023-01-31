import React from 'react'
import styles from './not-found.module.css'

export const NotFound404 = () => {
  return (
    <div className={styles.container}>
      <p className="text text_type_main-medium">Упс! Такой страницы не существует (ошибка 404)</p>
    </div>
  )
}
