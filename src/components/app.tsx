import React, { useEffect, useState } from 'react';
import './app.css';
import { AppHeader } from './app-header/app-header';
import { BurgerIngredients } from './burger-ingredients/burger-ingredients';
import { BurgerConstructor } from './burger-constructor/burger-constructor';
import { getSortedData } from '../utils/get-sorted-data'

const URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [state, setState] = useState({
    menu: {},
    isLoaded: false
  })

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(data => setState({menu: getSortedData(data.data), isLoaded: true }))
      .catch(error => console.error(error))
  }, [])

  return (
    <>
      <AppHeader />
      { state.isLoaded ?
        (<div className='app-container'>
          <BurgerIngredients menu={state.menu} />
          <BurgerConstructor menu={state.menu} />
        </div>) : null
      }
    </>
  );
}

export default App;
