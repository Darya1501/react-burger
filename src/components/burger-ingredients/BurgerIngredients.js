import React from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../utils/data';
import styles from './BurgerIngredients.module.css'
import { IngredientsCategory } from './IngredientsCategory';

const getData = () => {
  const menu = {
    bun: [],
    sauce: [],
    main: []
  }

  data.forEach(item => {
    if (item.type === "bun") {
      menu.bun.push(item)
    } else if (item.type === "sauce") {
      menu.sauce.push(item)
    } else {
      menu.main.push(item)
    }
  })

  return menu
}

export const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('bun');
  const { bun, sauce, main } = getData();

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
      <div style={{ display: 'flex' }} className="mb-10">
        <Tab value="bun" active={current === 'bun'} onClick={() => switchTab(bunRef, 'bun')}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={() => switchTab(sauceRef, 'sauce')}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={() => switchTab(mainRef, 'main')}>
          Начинки
        </Tab>
      </div>

      <div className={styles.categories}>
        <IngredientsCategory refLink={bunRef} category="Булки" ingredients={bun} />
        <IngredientsCategory refLink={sauceRef} category="Соусы" ingredients={sauce} />
        <IngredientsCategory refLink={mainRef} category="Начинки" ingredients={main} />
      </div>
    </div>
  )
}
