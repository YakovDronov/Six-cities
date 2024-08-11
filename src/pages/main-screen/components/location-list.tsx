import {CITIES} from '../../../const.ts';
import {v4 as uuidv4} from 'uuid';
import {City} from '../../../types/types.tsx';

type LocationListProps = {
  handlerCityClick: (id: City) => void;
  activeCity: City;
}

function LocationList({handlerCityClick, activeCity}: LocationListProps): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <li className="locations__item" key={uuidv4()}>
          <button onClick={() => handlerCityClick(city)} className={`locations__item-link tabs__item ${city.name === activeCity.name ? 'tabs__item--active' : ''}`}>
            <span>{city.name}</span>
          </button>
        </li>
      )
      )}
    </ul>
  );
}

export default LocationList;
