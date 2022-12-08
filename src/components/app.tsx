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

  const [selectedItems, setSelectedItems] = useState({
    bun: {},
    components: [{}, {}, {}]
  })

  useEffect(() => {
    async function fetchData() {
      const ingredients = await getIngredients();
      ingredients && setState( { menu: getSortedData(ingredients), isLoaded: true } )
      ingredients && setSelectedItems({ 
        bun: ingredients[1],
        components: [ingredients[3], ingredients[4], ingredients[5]]
      })
    }
    fetchData()
  }, [])

  return (
    <>
      <AppHeader />
      { state.isLoaded ?
        (<div className='app-container'>
          <IngredientsContext.Provider value={{ 
            bun: selectedItems.bun, 
            components: selectedItems.components
          }}>
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
