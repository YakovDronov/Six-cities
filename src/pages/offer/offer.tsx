import Layout from '../../components/layout.tsx';
import {useParams} from 'react-router-dom';
import NotFound from '../../components/not-found.tsx';
import OfferContainer from './component/offer-container.tsx';
import NearPlaces from './component/near-places.tsx';
import {getNearOfferCardById, getOfferById} from '../../utils.ts';
import {v4 as uuidv4} from 'uuid';
import {OffersTypes, ReviewsTypes} from '../../types/types.tsx';
import Map from '../../components/map.tsx';

type OfferProps = {
  reviews: ReviewsTypes[];
}

function Offer({reviews}: OfferProps): JSX.Element {
  const {id: offerId} = useParams();
  const currentOffer = getOfferById(offerId);
  const nearOfferCards: OffersTypes[] = getNearOfferCardById(offerId);

  if (!currentOffer) {
    return <NotFound/>;
  }

  return (
    <div className="page">
      <Layout>
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {currentOffer.images.map((image: string) => (
                  <div className="offer__image-wrapper" key={uuidv4()}>
                    <img className="offer__image" src={image} alt="Photo studio"/>
                  </div>
                )
                )}
              </div>
            </div>
            <OfferContainer
              currentOffer={currentOffer}
              reviews={reviews}
            />
            <Map
              baseClassName="offer"
              activeCity={currentOffer.city}
              activeCard={currentOffer}
              cityOffers={[...nearOfferCards, currentOffer]}
            />
          </section>
          <div className="container">
            <NearPlaces
              nearOfferCards={nearOfferCards}
            />
          </div>
        </main>
      </Layout>
    </div>
  );
}

export default Offer;
