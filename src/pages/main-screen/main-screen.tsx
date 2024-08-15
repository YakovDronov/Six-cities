import {OffersTypes, Sorting} from '../../types/types.tsx';
import Layout from '../../components/layout.tsx';
import CardList from '../../components/card-list.tsx';
import {useCallback, useEffect, useState} from 'react';
import Map from '../../components/map.tsx';
import LocationList from './components/location-list.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/actions.ts';
import {getActiveOffersLength} from '../../utils.ts';
import {SORTING} from '../../const.ts';
import {v4 as uuidv4} from 'uuid';

function MainScreen(): JSX.Element {
  const activeCity = useSelector((state: RootState) => state.currenrCity.currentCity);
  const offers = useSelector((state: RootState) => state.offers.offers);
  const [activeCard, setActiveCard] = useState<OffersTypes | null>(null);
  const [cityOffers, setCityOffers] = useState(offers.filter((offer) => offer.city.name === activeCity.name));
  const [isOpenSorting, setIsOpenSorting] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<Sorting | null>(null);

  const handleSorting = () => setIsOpenSorting((open) => !open);
  const handleSelectedSorting = (sort: Sorting) => {
    setSelectedFilter(sort);
    setIsOpenSorting(false);
  };

  const getSortedOffers = useCallback(() => {
    const filteredOffers = offers.filter((offer) => offer.city.name === activeCity.name);

    if (!selectedFilter) {
      return filteredOffers;
    }

    switch (selectedFilter) {
      case 'Price: low to high':
        return [...filteredOffers].sort((a, b) => a.price - b.price);
      case 'Price: high to low':
        return [...filteredOffers].sort((a, b) => b.price - a.price);
      case 'Top rated first':
        return [...filteredOffers].sort((a, b) => b.rating - a.rating);
      case 'Popular':
        return filteredOffers;
      default:
        return filteredOffers;
    }
  },[offers, activeCity, selectedFilter]);

  useEffect(() => {
    setCityOffers(getSortedOffers());
  }, [getSortedOffers]);

  const handleCardHover = (offersHover: OffersTypes | null): void => {
    setActiveCard(offersHover);
  };

  return (
    <div className="page page--gray page--main">
      <Layout>
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <LocationList
                activeCity={activeCity}
              />
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{cityOffers.length} {getActiveOffersLength(cityOffers.length)} to stay
                    in {activeCity.name}
                </b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0} onClick={handleSorting}>
                    {selectedFilter || 'Popular'}
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul
                    className={`places__options places__options--custom ${isOpenSorting ? 'places__options--opened' : ''}`}
                  >
                    {SORTING.map((sort: Sorting) => (
                      <li className={`places__option ${selectedFilter === sort ? 'places__option--active' : ''}`} tabIndex={0}
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
                  cityOffers={cityOffers}
                  onHover={handleCardHover}
                />
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
