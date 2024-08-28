import {ShortOfferTypes} from '../../types/types.tsx';
import Card from '../card/card.tsx';

type CardListProps = {
  cityOffers: ShortOfferTypes[];
  onHover: (offer: ShortOfferTypes | null) => void;
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
      {cityOffers.map((offer: ShortOfferTypes) => (
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
