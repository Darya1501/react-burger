import React, { RefObject } from 'react'
import { useSelector } from '../../hooks/store-hooks'; 

import { getSortedData } from '../../utils/get-sorted-data';
import { tabs } from '../../utils/constants';

import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsCategory } from './ingredients-category';

export const BurgerIngredients = () => {
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(state => state.ingredients);

  const [current, setCurrent] = React.useState(tabs.BUN);

  const bunRef = React.useRef<HTMLDivElement>(null)
  const sauceRef = React.useRef<HTMLDivElement>(null)
  const mainRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (!containerRef.current || !bunRef.current || !sauceRef.current || !mainRef.current) return;
    const containerPosition = containerRef.current.offsetTop;
    const bunPosition = bunRef.current.getBoundingClientRect().top;
    const saucePosition = sauceRef.current.getBoundingClientRect().top;
    const mainPosition = mainRef.current.getBoundingClientRect().top;

    if (containerPosition > bunPosition && containerPosition < saucePosition) {
      setCurrent(tabs.BUN)
    } else if (containerPosition > saucePosition && containerPosition < mainPosition) {
      setCurrent(tabs.SAUSE)
    } else {
      setCurrent(tabs.MAIN)
    }
  }

  const switchTab = (ref: RefObject<HTMLDivElement>, tab: string) => {
    if (!ref.current) return;
    ref.current.scrollIntoView({ behavior: 'smooth' });
    setCurrent(tab)
  }

  return (
    <div className={`${styles.container} pt-10`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className={`${styles.tabs} mb-10`}>
        <Tab value={tabs.BUN} active={current === tabs.BUN} onClick={() => switchTab(bunRef, tabs.BUN)}>
          Булки
        </Tab>
        <Tab value={tabs.SAUSE} active={current === tabs.SAUSE} onClick={() => switchTab(sauceRef, tabs.SAUSE)}>
          Соусы
        </Tab>
        <Tab value={tabs.MAIN} active={current === tabs.MAIN} onClick={() => switchTab(mainRef, tabs.MAIN)}>
          Начинки
        </Tab>
      </div>

      {
        ingredientsRequest ? (
          <p className="text text_type_main-medium">Загрузка...</p>
        ) : ingredientsFailed ? (
          <p className="text text_type_main-medium">Что-то пошло не так</p>
        ) : (
        <div className={styles.categories} ref={containerRef} onScroll={handleScroll}>
          <IngredientsCategory refLink={bunRef} category="Булки" ingredients={getSortedData(ingredients).buns} />
          <IngredientsCategory refLink={sauceRef} category="Соусы" ingredients={getSortedData(ingredients).sauces} />
          <IngredientsCategory refLink={mainRef} category="Начинки" ingredients={getSortedData(ingredients).mains} />
        </div>
        )
      }
    </div>
  )
}