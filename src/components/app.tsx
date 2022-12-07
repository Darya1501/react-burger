import React, { useEffect, useState } from 'react';
import './app.css';
import { AppHeader } from './app-header/app-header';
import { BurgerIngredients } from './burger-ingredients/burger-ingredients';
import { BurgerConstructor } from './burger-constructor/burger-constructor';
import { getSortedData } from '../utils/get-sorted-data'
import { getIngredients } from '../utils/burger-api';
import { IngredientsContext, OrderContext } from '../context/burger-context';

function App() {
  const [state, setState] = useState({
    menu: {
      buns: [],
      sauces: [],
      mains: []
    },
    isLoaded: false
  })

  const [ orderData, setOrderData ] = useState({ id: 0 })

  useEffect(() => {
    async function fetchData() {
      const ingredients = await getIngredients();
      ingredients && setState( { menu: getSortedData(ingredients), isLoaded: true } )
    }
    fetchData()
  }, [])

  return (
    <>
      <AppHeader />
      { state.isLoaded ?
        (<div className='app-container'>
          <IngredientsContext.Provider value={{ bun: state.menu.buns[0], components: [state.menu.sauces[2],
            state.menu.mains[0], state.menu.mains[1], state.menu.mains[2]] }}>
            <BurgerIngredients menu={state.menu} />
            <OrderContext.Provider value={{orderData, setOrderData}}>
              <BurgerConstructor />
            </OrderContext.Provider>
          </IngredientsContext.Provider>
        </div>) : null
      }
    </>
  );
}

export default App;
