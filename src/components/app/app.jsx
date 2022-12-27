import './app.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';

import { Login } from '../../pages/login';
import { Register } from '../../pages/register';
import { ForgotPassword } from '../../pages/forgot-password';
import { ResetPassword } from '../../pages/reset-password';
import { Profile } from '../../pages/profile';
import { Ingredient } from '../../pages/ingredient';
import { NotFound404 } from '../../pages/not-found';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { RouteWithAuth } from '../protected-routes/route-with-auth';
import { RouteWithoutAuth } from '../protected-routes/route-without-auth';
import { Modal } from '../modals/modal';
import { useDispatch } from 'react-redux';
import { IngredientDetails } from '../modals/ingredient-details';
import { useEffect } from 'react';
import { getIngredientsRequest } from '../../services/actions/ingredients';
import { getUserData } from '../../services/actions/user';

function App() {
  let location = useLocation();
  let background = location.state && location.state.background;
  const dispatch = useDispatch()
  let history = useHistory();

  useEffect(
    () => {
      dispatch(getIngredientsRequest());
      dispatch(getUserData());
    },
    [dispatch]
  );

  return (
    <>
      <AppHeader />
      <div className='app-container'>
        <Switch location={background || location}>
          <Route path='/' exact={true}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </Route>
          <RouteWithoutAuth path='/login' exact={true}>
            <Login />
          </RouteWithoutAuth>
          <RouteWithoutAuth path='/register' exact={true}>
            <Register />
          </RouteWithoutAuth>
          <RouteWithoutAuth path='/forgot-password' exact={true}>
            <ForgotPassword />
          </RouteWithoutAuth>
          <RouteWithoutAuth path='/reset-password' exact={true}>
            <ResetPassword />
          </RouteWithoutAuth>
          <RouteWithAuth path="/profile">
            <Profile />
          </RouteWithAuth>
          <Route path='/ingredients/:id' exact={true}>
            <Ingredient />
          </Route>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
        { background && 
          <Route path="/ingredients/:id" 
            children={
              <Modal onClose={history.goBack} header='Детали ингредиента'>
                <IngredientDetails />
              </Modal>}
          />
        }
      </div>
    </>
  );
}

export default App;
