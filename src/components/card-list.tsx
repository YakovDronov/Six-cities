import {OffersTypes} from '../types/types.tsx';
import Card from './card.tsx';

type CardListProps = {
  cityOffers: OffersTypes[];
  onHover: (offer: OffersTypes | null) => void;
};

function CardList({ cityOffers, onHover }: CardListProps): JSX.Element {

  const changeIdActiveCard = (id: string): void => {
    const currentCard = cityOffers.find((offer) => offer.id === id) || null;
    if (onHover) {
      onHover(currentCard);
    }
  };

  const removeIdActiveCard = (): void => {
    if (onHover) {
      onHover(null);
    }
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {cityOffers.map((offer: OffersTypes) => (
        <Card
          key={offer.id}
          data={offer}
          onHandlerChangeIdActiveCard={() => changeIdActiveCard(offer.id)}
          onHandlerRemoveIdActiveCard={removeIdActiveCard}
        />
      ))}
    </div>
  );
}

export default CardList;
