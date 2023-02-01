import { useEffect } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from '../../utils/hooks';

import { Home } from '../../pages/home/home';
import { Login } from '../../pages/auth/login';
import { Register } from '../../pages/auth/register';
import { ForgotPassword } from '../../pages/auth/forgot-password';
import { ResetPassword } from '../../pages/auth/reset-password';
import { Profile } from '../../pages/profile/profile';
import { Ingredient } from '../../pages/ingredient/ingredient';
import { NotFound404 } from '../../pages/not-found/not-found';
import { AppHeader } from '../app-header/app-header';

import { ProtectedRoute } from '../protected-routes/protected-route';
import { Modal } from '../modals/modal';
import { IngredientDetails } from '../details/ingredient-details';

import { getIngredientsRequest } from '../../services/actions/ingredients';
import { getUserData } from '../../services/actions/user';

import styles from './app.module.css';
import { ILocation } from '../../utils/types';
import { Feed } from '../../pages/feed/feed';
import { FeedOrderDetails } from '../details/feed-order-details';

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
          <ProtectedRoute path='/feed' exact={true}>
            <Feed />
          </ProtectedRoute>
          <ProtectedRoute path='/feed/:id' exact={true}>
            <FeedOrderDetails />
          </ProtectedRoute>
          <ProtectedRoute onlyForUnauth path='/login' exact={true}>
            <Login />
          </ProtectedRoute>
          <ProtectedRoute onlyForUnauth path='/register' exact={true}>
            <Register />
          </ProtectedRoute>
          <ProtectedRoute onlyForUnauth path='/forgot-password' exact={true}>
            <ForgotPassword />
          </ProtectedRoute>
          <ProtectedRoute onlyForUnauth path='/reset-password' exact={true}>
            <ResetPassword />
          </ProtectedRoute>
          <ProtectedRoute onlyForAuth path='/profile/orders/:id' exact={true}>
            <FeedOrderDetails />
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

        { background && 
          <Route path="/feed/:id" 
            children={
              <Modal onClose={history.goBack}>
                <FeedOrderDetails />
              </Modal>}
          />
        }

        { background && 
          <Route path="/profile/orders/:id" 
            children={
              <Modal onClose={history.goBack}>
                <FeedOrderDetails />
              </Modal>}
          />
        }
      </div>
    </div>
  );
}

export default App;
