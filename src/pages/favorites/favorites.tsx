import {Link, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {getFavotiteLength, getFavotiteOfferCard, getOfferCardByCity} from '../../utils.ts';
import Layout from '../../components/layout/layout.tsx';
import {ShortOfferTypes} from '../../types/types.tsx';
import Card from '../../components/card/card.tsx';
import {useSelector} from 'react-redux';
import {RootState, useAppSelector} from '../../store/actions.ts';
import {useEffect} from 'react';

function Favorites(): JSX.Element {
  const offers = useSelector((state: RootState) => state.offers.offers);
  const offerCardsByCity = getOfferCardByCity(getFavotiteOfferCard(offers));
  const offerCardsLength = getFavotiteLength(getFavotiteOfferCard(offers));
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector((state) => state.authorizationReducer.authorizationStatus);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(`${AppRoute.Login}`);
    }
  }, [authorizationStatus, navigate]);

  return (
    <div className={`page ${offerCardsLength.length < 1 ? 'page--favorites-empty' : ''}`}>
      <Layout>
        <main
          className={`page__main page__main--favorites ${offerCardsLength.length < 1 ? 'page__main--favorites-empty' : ''}`}
        >
          {offerCardsLength.length > 0
            ?
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {Object.entries(offerCardsByCity).map(([cityName, offerCards]) => (
                    <li className="favorites__locations-items" key={cityName}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <Link className="locations__item-link" to="#">
                            <span>{cityName}</span>
                          </Link>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {offerCards.map((offerCard: ShortOfferTypes) => (
                          <Card
                            key={offerCard.id}
                            data={offerCard}
                            type={'favorites'}
                          />
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
            :
            <div className="page__favorites-container container">
              <section className="favorites favorites--empty">
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan your future
                  trips.
                  </p>
                </div>
              </section>
            </div>}
        </main>
      </Layout>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </div>
  );
}

export default Favorites;
