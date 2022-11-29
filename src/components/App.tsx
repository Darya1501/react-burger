import React from 'react';
import './App.css';
import { AppHeader } from './app-header/app-header';
import { BurgerIngredients } from './burger-ingredients/burger-ingredients';
import { BurgerConstructor } from './burger-constructor/burger-constructor';

function App() {
  return (
    <>
      <AppHeader />
      <div className='app-container'>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </>
  );
}

export default App;
