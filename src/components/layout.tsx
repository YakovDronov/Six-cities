import {Link} from 'react-router-dom';
import {AppRoute} from '../const.ts';
import {getFavotiteOfferCard} from '../utils.ts';
import {logoutAction} from '../store/api-actions.ts';
import {useAppDispatch} from '../store/actions.ts';

function Layout({children} : {children: React.ReactNode}) {
  const dispatch = useAppDispatch();

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
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </Link>
                  <Link className="header__favorite-count" to={AppRoute.Favorites}>{getFavotiteOfferCard.length}</Link>
                </li>
                <li className="header__nav-item" onClick={(evt) => {
                  evt.preventDefault();
                  dispatch(logoutAction());
                }}
                >
                  <Link to={'/'} className="header__nav-link">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
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
