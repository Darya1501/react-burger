import React, { useEffect, useState } from 'react';
import './app.css';
import { AppHeader } from './app-header/app-header';
import { BurgerIngredients } from './burger-ingredients/burger-ingredients';
import { BurgerConstructor } from './burger-constructor/burger-constructor';
import { getSortedData } from '../utils/get-sorted-data'
import { getIngredients } from '../utils/burger-api';

function App() {
  const [state, setState] = useState({
    menu: {
      buns: [],
      sauces: [],
      mains: []
    },
    isLoaded: false
  })

  useEffect(() => {
    async function fetchData() {
      const ingredients = await getIngredients();
      ingredients && setState( {menu: getSortedData(ingredients), isLoaded: true } )
    }
    fetchData()
  }, [])

  return (
    <>
      <AppHeader />
      { state.isLoaded ?
        (<div className='app-container'>
          <BurgerIngredients menu={state.menu} />
          <BurgerConstructor bun={state.menu.buns[0]} sauces={state.menu.sauces} mains={state.menu.mains} />
        </div>) : null
      }
    </>
  );
}

export default App;
