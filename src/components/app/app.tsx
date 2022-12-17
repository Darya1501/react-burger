import './app.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <div className='app-container'>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </DndProvider>
    </>
  );
}

export default App;
