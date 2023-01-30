import { useEffect } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from '../../utils/hooks';

import { Home } from '../../pages/home';
import { Login } from '../../pages/login';
import { Register } from '../../pages/register';
import { ForgotPassword } from '../../pages/forgot-password';
import { ResetPassword } from '../../pages/reset-password';
import { Profile } from '../../pages/profile';
import { Ingredient } from '../../pages/ingredient';
import { NotFound404 } from '../../pages/not-found';
import { AppHeader } from '../app-header/app-header';

import { ProtectedRoute } from '../protected-routes/protected-route';
import { Modal } from '../modals/modal';
import { IngredientDetails } from '../modals/ingredient-details';

import { getIngredientsRequest } from '../../services/actions/ingredients';
import { getUserData } from '../../services/actions/user';

import styles from './app.module.css';
import { ILocation } from '../../utils/types';

interface IWithStateLocation extends ILocation {
  state: { background : IWithStateLocation };
}

function App() {
  const location: IWithStateLocation = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useDispatch()
  const history = useHistory();

  useEffect(
    () => {
      dispatch(getIngredientsRequest());
      dispatch(getUserData());
    },
    [dispatch]
  );

  return (
    <div className={styles.container}>
      <AppHeader />
      <div className={styles.content}>
        <Switch location={background || location}>
          <Route path='/' exact={true}>
            <Home />
          </Route>
          <ProtectedRoute onlyForAuth={false} path='/login' exact={true}>
            <Login />
          </ProtectedRoute>
          <ProtectedRoute onlyForAuth={false} path='/register' exact={true}>
            <Register />
          </ProtectedRoute>
          <ProtectedRoute onlyForAuth={false} path='/forgot-password' exact={true}>
            <ForgotPassword />
          </ProtectedRoute>
          <ProtectedRoute onlyForAuth={false} path='/reset-password' exact={true}>
            <ResetPassword />
          </ProtectedRoute>
          <ProtectedRoute onlyForAuth path="/profile">
            <Profile />
          </ProtectedRoute>
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
    </div>
  );
}

export default App;
