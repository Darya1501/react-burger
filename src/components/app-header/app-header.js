import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';

export const AppHeader = () => {
  const linksClasses = `${styles.link} text text_type_main-default p-5`;

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <a href="/" className={`${linksClasses} ${styles.active} mr-2`}>
            <BurgerIcon type="primary" />
            Конструктор
          </a>
          <a href="/" className={linksClasses}>
            <ListIcon type="secondary" />
            Лента заказов
          </a>
        </nav>

        <Logo />

        <a href="/" className={linksClasses}>
          <ProfileIcon type="secondary" />
          Личный кабинет
        </a>
      </div>
    </header>
  )
}
