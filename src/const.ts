import {City} from './types/types.tsx';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  OfferStatic = '/offer'
}

export enum APIRoute {
  Offers = '/offers',
  Favorite = '/favorite',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const CITIES: City[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.856663,
      longitude: 2.351556,
      zoom: 8,
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.930779,
      longitude: 6.938399,
      zoom: 8,
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.826827,
      longitude: 4.373448,
      zoom: 8,
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.372898,
      longitude: 4.893,
      zoom: 8,
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.5753,
      longitude: 10.0153,
      zoom: 8,
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.2217,
      longitude: 6.77616,
      zoom: 8,
    }
  },
];

export const SORTING = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'] as const;

export enum Markers {
  Default = 'markup/img/pin.svg',
  Current = 'markup/img/pin-active.svg',
}

export enum TileLayers {
  UrlPattern = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  Attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
}
