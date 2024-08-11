import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {getFavotiteOfferCard, getOfferCardByCity} from '../../utils.ts';
import Layout from '../../components/layout.tsx';
import {OffersTypes} from '../../types/types.tsx';
import Card from '../../components/card.tsx';

function Favorites(): JSX.Element {
  const offerCardsByCity = getOfferCardByCity(getFavotiteOfferCard);

  return (
    <div className="page">
      <Layout>
        <main className="page__main page__main--favorites">
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
                      {offerCards.map((offerCard: OffersTypes) => (
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
