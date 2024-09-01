import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {getFavotiteLength, getFavotiteOfferCard} from '../../utils.ts';
import {logoutAction} from '../../store/api-actions.ts';
import {RootState, useAppDispatch, useAppSelector} from '../../store/actions.ts';
import {useSelector} from 'react-redux';

function Layout({children}: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationReducer.authorizationStatus
  );
  const userData = useAppSelector(
    (state) => state.authorizationReducer.user
  );

  const offers = useSelector((state: RootState) => state.offers.offers);
  const offerCardsLength = getFavotiteLength(getFavotiteOfferCard(offers));

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Main} className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus !== AuthorizationStatus.Auth
                  ?
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                  :
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__user-name user__name">{userData?.email}</span>
                      </Link>
                      <Link className="header__favorite-count"
                        to={AppRoute.Favorites}
                      >{offerCardsLength.length}
                      </Link>
                    </li>

                    <li className="header__nav-item" onClick={(evt) => {
                      evt.preventDefault();
                      dispatch(logoutAction());
                    }}
                    >
                      <Link to={'/'} className="header__nav-link">
                        <span className="header__signout">Log Out</span>
                      </Link>
                    </li>
                  </>}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}

export default Layout;
