import {CITIES} from '../../../const.ts';
import {v4 as uuidv4} from 'uuid';
import {City} from '../../../types/types.tsx';
import {changeActiveCity} from '../../../store/actions.ts';
import {useDispatch} from 'react-redux';

type LocationListProps = {
  activeCity: City;
}

function LocationList({activeCity}: LocationListProps): JSX.Element {
  const dispatch = useDispatch();
  const handleCityClick = (city: City) => {
    if (city.name !== activeCity.name) {
      dispatch(changeActiveCity(city));
    }
  };

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <li className="locations__item" key={uuidv4()}>
          <button
            onClick={() => handleCityClick(city)}
            className={`locations__item-link tabs__item ${city.name === activeCity.name ? 'tabs__item--active' : ''}`}
          >
            <span>{city.name}</span>
          </button>
        </li>
      )
      )}
    </ul>
  );
}

export default LocationList;
