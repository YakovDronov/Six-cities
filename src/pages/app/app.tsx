import MainScreen from '../main-screen/main-screen.tsx';
import {Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import Login from '../login/login.tsx';
import Favorites from '../favorites/favorites.tsx';
import Offer from '../offer/offer.tsx';
import NotFound from '../../components/not-found/not-found.tsx';
import PrivateRoute from '../../components/private-route/private-route.tsx';
import {useAppSelector} from '../../store/actions.ts';
import {LoadingScreen} from '../../components/loading/loading-screen.tsx';
import {HistoryRouter} from '../../components/history-route/history-route.tsx';
import {browserHistory} from '../../browser-history.ts';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationReducer.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.authorizationReducer.isOffersDataLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (<LoadingScreen/>);
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen/>}
        >
        </Route>
        <Route
          path={AppRoute.Login}
          element={<Login/>}
        >
        </Route>
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <Favorites/>
            </PrivateRoute>
          }
        >
        </Route>
        <Route
          path={AppRoute.Offer}
          element={<Offer/>}
        >
        </Route>
        <Route
          path='*'
          element={<NotFound/>}
        >
        </Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
