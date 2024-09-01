import {ShortOfferTypes} from './types/types.tsx';

export const capitalizeFirstLetter = (word: string): string => word[0].toUpperCase() + word.slice(1);

type OffersByCityType = {
  [key: string]: ShortOfferTypes[];
}

export const getOfferCardByCity = (offers: ShortOfferTypes[]) => {
  const cardByCity: OffersByCityType = {};

  for (const card of offers) {
    if (!cardByCity[card.city.name]) {
      cardByCity[card.city.name] = [];
    }

    cardByCity[card.city.name].push(card);
  }

  return cardByCity;
};

export const getFavotiteOfferCard = (offers: ShortOfferTypes[]) => offers.filter((offerCard: ShortOfferTypes) => offerCard.isFavorite);
export const getFavotiteLength = (offers: ShortOfferTypes[]) => offers.filter((offerCard: ShortOfferTypes) => offerCard);

export const getBedroomsCount = (count: number): string => `${count} Bedroom${count > 1 ? 's' : ''}`;
export const getAdultsCount = (count: number): string => `Max ${count} adult${count > 1 ? 's' : ''}`;

export const MIN_VISIBLE_CARDS: number = 0;
export const MAX_VISIBLE_CARDS: number = 3;
