import {ShortOfferTypes} from '../../../types/types.tsx';
import Card from '../../../components/card/card.tsx';

type NearPlacesProps = {
  nearOfferCards: ShortOfferTypes[];
}

function NearPlaces({nearOfferCards}: NearPlacesProps): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">
        Other places in the neighbourhood
      </h2>
      <div className="near-places__list places__list">
        {nearOfferCards.slice(0, 3).map((item: ShortOfferTypes) =>
          <Card key={item.id} data={item} type={'near-places'}/>)}
      </div>
    </section>
  );
}

export default NearPlaces;
