import React from 'react';
import './App.css';
import { AppHeader } from './app-header/AppHeader';
import { BurgerIngredients } from './burger-ingredients/BurgerIngredients';
import { BurgerConstructor } from './burger-constructor/BurgerConstructor';

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
