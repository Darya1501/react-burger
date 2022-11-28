import React from 'react';
import './App.css';
import { AppHeader } from './app-header/AppHeader';
import { BurgerIngredients } from './burger-ingredients/BurgerIngredients';

function App() {
  return (
    <>
      <AppHeader />
      <div className='app-container'>
        <BurgerIngredients />
      </div>
    </>
  );
}

export default App;
