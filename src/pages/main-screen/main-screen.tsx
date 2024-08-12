import {City, OffersTypes} from '../../types/types.tsx';
import Layout from '../../components/layout.tsx';
import CardList from '../../components/card-list.tsx';
import {useState} from 'react';
import Map from '../../components/map.tsx';
import LocationList from './components/location-list.tsx';
import {CITIES} from '../../const.ts';

type MainScreenProps = {
  offers: OffersTypes[];
}

function MainScreen({offers}: MainScreenProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<OffersTypes | null>(null);
  const [activeCity, setActiveCity] = useState<City>(CITIES[3]);
  const [cityOffers, setCityOffers] = useState(offers.filter((offer) => offer.city.name === activeCity.name));
  const handleCardHover = (offersHover: OffersTypes | null): void => {
    setActiveCard(offersHover);
  };

  const handlerCityClick = (city: City): void => {
    setActiveCity(city);
    setCityOffers(offers.filter((offer) => offer.city.name === city.name));
  };

  return (
    <div className="page page--gray page--main">
      <Layout>
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <LocationList
                handlerCityClick={handlerCityClick}
                activeCity={activeCity}
              />
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{cityOffers.length} places to stay in {activeCity.name}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                    <li className="places__option" tabIndex={0}>Price: low to high</li>
                    <li className="places__option" tabIndex={0}>Price: high to low</li>
                    <li className="places__option" tabIndex={0}>Top rated first</li>
                  </ul>
                </form>
                <CardList cityOffers={cityOffers} onHover={handleCardHover}/>
              </section>
              <div className="cities__right-section">
                <Map
                  baseClassName="cities"
                  activeCity={activeCity}
                  activeCard={activeCard}
                  cityOffers={cityOffers}
                />
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </div>
  );
}

export default MainScreen;
