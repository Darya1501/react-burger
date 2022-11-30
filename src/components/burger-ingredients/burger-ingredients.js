import React from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'
import { IngredientsCategory } from './ingredients-category';

export const BurgerIngredients = ({ menu }) => {
  const Tabs = {
    BUN: 'bun',
    SAUSE: 'sauce',
    MAIN: 'main'
  }

  const [current, setCurrent] = React.useState(Tabs.BUN);
  const { buns, sauces, mains } = menu;

  const bunRef = React.useRef(null)
  const sauceRef = React.useRef(null)
  const mainRef = React.useRef(null)

  const switchTab = (ref, tab) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
    setCurrent(tab)
  }

  return (
    <div className={`${styles.container} pt-10`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className={`${styles.tabs} mb-10`}>
        <Tab value={Tabs.BUN} active={current === Tabs.BUN} onClick={() => switchTab(bunRef, Tabs.BUN)}>
          Булки
        </Tab>
        <Tab value={Tabs.SAUSE} active={current === Tabs.SAUSE} onClick={() => switchTab(sauceRef, Tabs.SAUSE)}>
          Соусы
        </Tab>
        <Tab value={Tabs.MAIN} active={current === Tabs.MAIN} onClick={() => switchTab(mainRef, Tabs.MAIN)}>
          Начинки
        </Tab>
      </div>

      <div className={styles.categories}>
        <IngredientsCategory refLink={bunRef} category="Булки" ingredients={buns} />
        <IngredientsCategory refLink={sauceRef} category="Соусы" ingredients={sauces} />
        <IngredientsCategory refLink={mainRef} category="Начинки" ingredients={mains} />
      </div>
    </div>
  )
}
