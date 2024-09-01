import {ShortOfferTypes, Sorting} from '../../types/types.tsx';
import Layout from '../../components/layout/layout.tsx';
import CardList from '../../components/card-list/card-list.tsx';
import {useEffect, useState} from 'react';
import Map from '../../components/map/map.tsx';
import LocationList from './components/location-list.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/actions.ts';
import {sortingOptions} from '../../const.ts';
import {v4 as uuidv4} from 'uuid';
import {getActiveOffersLength, getSortedOffers} from './utils.ts';

function MainScreen(): JSX.Element {
  const activeCity = useSelector((state: RootState) => state.currentCity.currentCity);
  const offers = useSelector((state: RootState) => state.offers.offers);
  const [activeCard, setActiveCard] = useState<ShortOfferTypes | null>(null);
  const [filteredOffers, setFilteredOffers] = useState<ShortOfferTypes[]>([]);
  const [isOpenSorting, setIsOpenSorting] = useState<boolean>(false);
  const [selectedSorting, setSelectedSorting] = useState<Sorting>(sortingOptions[0]);

  useEffect(() => {
    setFilteredOffers(
      offers.filter((offer) => offer.city.name === activeCity.name)
    );
  }, [activeCity.name, offers]);

  const handleVisibleSorting = () => setIsOpenSorting((open) => !open);
  const handleCardHover = (offersHover: ShortOfferTypes | null): void => {
    setActiveCard(offersHover);
  };

  const handleSorting = (sort: Sorting) => {
    const sortedOffers = getSortedOffers({filteredOffers, sort});
    setFilteredOffers(sortedOffers);
  };

  const handleSelectedSorting = (sort: Sorting) => {
    setSelectedSorting(sort);
    setIsOpenSorting(false);
    handleSorting(sort);
  };

  return (
    <div className="page page--gray page--main">
      <Layout>
        <main
          className={`page__main page__main--index ${filteredOffers && filteredOffers.length < 1 ? 'page__main--index-empty' : ''}`}
        >
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <LocationList
                activeCity={activeCity}
              />
            </section>
          </div>
          {filteredOffers && filteredOffers.length > 0 ?
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{filteredOffers.length} {getActiveOffersLength(filteredOffers.length)} to
                    stay
                    in {activeCity.name}
                  </b>
                  <form className="places__sorting" action="#" method="get">
                    <span className="places__sorting-caption">Sort by</span>
                    <span className="places__sorting-type" tabIndex={0} onClick={handleVisibleSorting}>
                      {selectedSorting}
                      <svg className="places__sorting-arrow" width="7" height="4">
                        <use xlinkHref="#icon-arrow-select"></use>
                      </svg>
                    </span>
                    <ul
                      className={`places__options places__options--custom ${isOpenSorting ? 'places__options--opened' : ''}`}
                    >
                      {sortingOptions.map((sort: Sorting) => (
                        <li className={`places__option ${selectedSorting === sort ? 'places__option--active' : ''}`}
                          tabIndex={0}
                          key={uuidv4()}
                          onClick={() => handleSelectedSorting(sort)}
                        >
                          {sort}
                        </li>
                      )
                      )}
                    </ul>
                  </form>
                  <CardList
                    cityOffers={filteredOffers}
                    onHover={handleCardHover}
                  />
                </section>
                <div className="cities__right-section">
                  <Map
                    baseClassName="cities"
                    activeCity={activeCity}
                    activeCard={activeCard}
                    cityOffers={filteredOffers}
                  />
                </div>
              </div>
            </div>
            :
            <div className="cities">
              <div className="cities__places-container cities__places-container--empty container">
                <section className="cities__no-places">
                  <div className="cities__status-wrapper tabs__content">
                    <b className="cities__status">No places to stay available</b>
                    <p className="cities__status-description">We could not find any property available at the moment in {activeCity.name}</p>
                  </div>
                </section>
                <div className="cities__right-section"></div>
              </div>
            </div>}
        </main>
      </Layout>
    </div>
  );
}

export default MainScreen;
