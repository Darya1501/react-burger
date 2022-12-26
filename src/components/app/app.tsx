import './app.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Login } from '../../pages/login';
import { Register } from '../../pages/register';
import { ForgotPassword } from '../../pages/forgot-password';
import { ResetPassword } from '../../pages/reset-password';
import { Profile } from '../../pages/profile';
import { Ingredient } from '../../pages/ingredient';
import { NotFound404 } from '../../pages/not-found';

function App() {
  return (
    <>
      <AppHeader />
      <div className='app-container'>
        <Router>
          <Switch>
            <Route path='/' exact={true}>
              <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients />
                  <BurgerConstructor />
              </DndProvider>
            </Route>
            <Route path='/login' exact={true}>
              <Login />
            </Route>
            <Route path='/register' exact={true}>
              <Register />
            </Route>
            <Route path='/forgot-password' exact={true}>
              <ForgotPassword />
            </Route>
            <Route path='/reset-password' exact={true}>
              <ResetPassword />
            </Route>
            <Route path='/profile' exact={true}>
              <Profile />
            </Route>
            <Route path='/ingredients/:id' exact={true}>
              <Ingredient />
            </Route>
            <Route>
              <NotFound404 />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
