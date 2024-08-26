import Layout from '../../components/layout.tsx';
import {useNavigate, useParams} from 'react-router-dom';
import NotFound from '../../components/not-found.tsx';
import OfferContainer from './component/offer-container.tsx';
import NearPlaces from './component/near-places.tsx';
import {v4 as uuidv4} from 'uuid';
import {NearOffersTypes, OffersTypes} from '../../types/types.tsx';
import Map from '../../components/map.tsx';
import {useEffect, useState} from 'react';
import {api, store} from '../../store';
import {APIRoute, AppRoute} from '../../const.ts';
import {fetchOffersAction} from '../../store/api-actions.ts';

function Offer(): JSX.Element {
  const navigate = useNavigate();
  const {id: offerId} = useParams();

  const [currentOffer, setCurrentOffer] = useState<OffersTypes | undefined>();
  const [nearOfferCards, setNearOfferCards] = useState<NearOffersTypes[] | undefined>();

  const onHandleFavorite = async () => {
    try {
      const offerStatus = currentOffer?.isFavorite;
      const status = Number(!offerStatus);
      await api.post<OffersTypes[]>(`${APIRoute.Favorite}/${offerId}/${status}`);
      store.dispatch(fetchOffersAction());
    } catch {
      navigate(AppRoute.Error);
    }
  };

  useEffect(() => {
    if (offerId) {
      (async () => {
        try {
          const {data: currentOfferData} = await api.get<OffersTypes>(`${APIRoute.Offers}/${offerId}`);
          const {data: nearOfferCardsData} = await api.get<NearOffersTypes[]>(`${APIRoute.Offers}/${offerId}${APIRoute.Nearby}`);
          setCurrentOffer(currentOfferData);
          setNearOfferCards(nearOfferCardsData);
        } catch {
          navigate(AppRoute.Error);
        }
      })();
    }
  }, [navigate, offerId]);

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
              onHandleFavorite={onHandleFavorite}
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
