import Layout from '../../components/layout/layout.tsx';
import {useNavigate, useParams} from 'react-router-dom';
import OfferContainer from './component/offer-container.tsx';
import NearPlaces from './component/near-places.tsx';
import {v4 as uuidv4} from 'uuid';
import {ShortOfferTypes, OfferTypes} from '../../types/types.tsx';
import Map from '../../components/map/map.tsx';
import {useEffect, useState} from 'react';
import {api, store} from '../../store';
import {APIRoute, AppRoute} from '../../const.ts';
import {fetchOffersAction} from '../../store/api-actions.ts';
import {LoadingScreen} from "../../components/loading/loading-screen.tsx";

function Offer(): JSX.Element {
  const navigate = useNavigate();
  const {id: offerId} = useParams();

  const [currentOffer, setCurrentOffer] = useState<OfferTypes | undefined>();
  const [nearOfferCards, setNearOfferCards] = useState<ShortOfferTypes[] | undefined>();

  const onHandleFavorite = async () => {
    try {
      const offerStatus = !currentOffer?.isFavorite;
      const status = Number(offerStatus);
      await api.post<OfferTypes[]>(`${APIRoute.Favorite}/${offerId}/${status}`);
      setCurrentOffer((prevState) => {
        if(prevState) {
          return {...prevState, isFavorite: offerStatus};
        }
      });
      store.dispatch(fetchOffersAction());
    } catch {
      navigate(AppRoute.Error);
    }
  };

  useEffect(() => {
    if (offerId) {
      (async () => {
        try {
          const {data: currentOfferData} = await api.get<OfferTypes>(`${APIRoute.Offers}/${offerId}`);
          const {data: nearOfferCardsData} = await api.get<ShortOfferTypes[]>(`${APIRoute.Offers}/${offerId}${APIRoute.Nearby}`);
          setCurrentOffer(currentOfferData);
          setNearOfferCards(nearOfferCardsData);
        } catch {
          navigate(AppRoute.Error);
        }
      })();
    }
  }, [navigate, offerId]);

  if (!currentOffer) {
    return <LoadingScreen/>;
  }

  return (
    <div className="page">
      <Layout>
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {currentOffer.images.slice(0, 6).map((image: string) => (
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
            {nearOfferCards && (
              <Map
                baseClassName="offer"
                activeCity={currentOffer.city}
                activeCard={currentOffer}
                cityOffers={[...nearOfferCards.slice(0, 3), currentOffer]}
              />)}
          </section>
          <div className="container">
            {nearOfferCards && (
              <NearPlaces
                nearOfferCards={nearOfferCards}
              />)}
          </div>
        </main>
      </Layout>
    </div>
  );
}

export default Offer;
