import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';
import { Link, NavLink, useLocation } from 'react-router-dom';

export const AppHeader = () => {
  const linksClasses = `${styles.link} text text_type_main-default p-5`;
  
  const location = useLocation()
  const defineType = path => path === location.pathname ? 'primary' : 'secondary';

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.container}>
          <nav className={styles.nav}>
            <NavLink to="/" className={`${linksClasses} mr-2`} activeClassName={styles.active} exact >
              <BurgerIcon type={defineType('/')} />
              Конструктор
            </NavLink>
            <NavLink to="/feed" className={linksClasses} activeClassName={styles.active}>
              <ListIcon type={defineType('/feed')} />
              Лента заказов
            </NavLink>
          </nav>

        <Link to="" className={styles.logo}>
          <Logo />
        </Link>

        <NavLink to="/profile" className={linksClasses} activeClassName={styles.active}>
          <ProfileIcon type={defineType('/profile')} />
          Личный кабинет
        </NavLink>
      </div>
    </header>
  )
}
