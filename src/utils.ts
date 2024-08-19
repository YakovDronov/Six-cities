import {OffersTypes} from './types/types.tsx';

export const capitalizeFirstLetter = (word: string): string => word[0].toUpperCase() + word.slice(1);

type OffersByCityType = {
  [key: string]: OffersTypes[];
}

export const getOfferCardByCity = (offers: OffersTypes[]) => {
  const cardByCity: OffersByCityType = {};

  for (const card of offers) {
    if (!cardByCity[card.city.name]) {
      cardByCity[card.city.name] = [];
    }

    cardByCity[card.city.name].push(card);
  }

  return cardByCity;
};

export const getFavotiteOfferCard = (offers: OffersTypes[]) => offers.filter((offerCard: OffersTypes) => offerCard.isFavorite);
export const getOfferById = (offers: OffersTypes[], offerId: string | undefined) => offers.find((offer: OffersTypes): boolean => offer.id === offerId);
export const getNearOfferCardById = (offers: OffersTypes[], offerId: string | undefined) => offers.filter((offer: OffersTypes): boolean => offer.id !== offerId).slice(0, 3);

export const getBedroomsCount = (count: number): string => `${count} Bedroom${count > 1 ? 's' : ''}`;
export const getAdultsCount = (count: number): string => `Max ${count} adult${count > 1 ? 's' : ''}`;
