import {OffersTypes, Sorting} from '../../types/types.tsx';

export const getSortedOffers = ({filteredOffers, sort}: {
  filteredOffers: OffersTypes[];
  sort: Sorting;
}): OffersTypes[] => {
  switch (sort) {
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
};

export const getActiveOffersLength = (count: number): string => `place${count > 1 ? 's' : ''}`;

