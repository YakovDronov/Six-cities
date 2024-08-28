import {capitalizeFirstLetter, getAdultsCount, getBedroomsCount} from '../../../utils.ts';
import {OfferTypes} from '../../../types/types.tsx';
import Reviews from './reviews.tsx';
import {useAppSelector} from "../../../store/actions.ts";
import {AuthorizationStatus} from "../../../const.ts";

type OfferContainerProps = {
  currentOffer: OfferTypes;
  onHandleFavorite: (id: string) => Promise<void>;
}

function OfferContainer({currentOffer, onHandleFavorite}: OfferContainerProps): JSX.Element {
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationReducer.authorizationStatus
  );
  const onHandleClickFavorite = () => {
    onHandleFavorite(currentOffer.id);
  };

  return (
    <div className="offer__container container">
      <div className="offer__wrapper">
        {currentOffer.isPremium
          &&
          <div className="offer__mark">
            <span>Premium</span>
          </div>
        }
        <div className="offer__name-wrapper">
          <h1 className="offer__name">
            {currentOffer.title}
          </h1>
          {authorizationStatus === AuthorizationStatus.Auth
            &&
            <button
              className={`offer__bookmark-button button ${currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''}`}
              type="button"
              onClick={onHandleClickFavorite}
            >
              <svg className="offer__bookmark-icon" width={31} height={33}>
                <use xlinkHref="#icon-bookmark"/>
              </svg>
              <span className="visually-hidden">{currentOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
            </button>
          }
        </div>
        <div className="offer__rating rating">
          <div className="offer__stars rating__stars">
            <span style={{width: `${currentOffer.rating / 5 * 100}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
          <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
        </div>
        <ul className="offer__features">
          <li className="offer__feature offer__feature--entire">
            {capitalizeFirstLetter(currentOffer.type)}
          </li>
          <li className="offer__feature offer__feature--bedrooms">
            {getBedroomsCount(currentOffer.bedrooms)}
          </li>
          <li className="offer__feature offer__feature--adults">
            {getAdultsCount(currentOffer.maxAdults)}
          </li>
        </ul>
        <div className="offer__price">
          <b className="offer__price-value">€{currentOffer.price}</b>
          <span className="offer__price-text">&nbsp;night</span>
        </div>
        <div className="offer__inside">
          <h2 className="offer__inside-title">What&apos;s inside</h2>
          <ul className="offer__inside-list">
            {currentOffer.goods.map((goodItem: string) =>
              <li className="offer__inside-item" key={goodItem}>{goodItem}</li>
            )}
          </ul>
        </div>
        <div className="offer__host">
          <h2 className="offer__host-title">Meet the host</h2>
          <div className="offer__host-user user">
            <div
              className={`offer__avatar-wrapper ${currentOffer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}
            >
              <img
                className="offer__avatar user__avatar"
                src={currentOffer.host.avatarUrl}
                width={74}
                height={74}
                alt="Host avatar"
              />
            </div>
            <span className="offer__user-name">{currentOffer.host.name}</span>
            {currentOffer.host.isPro
              &&
              <span className="offer__user-status">Pro</span>
            }
          </div>
          <div className="offer__description">
            <p className="offer__text">
              {currentOffer.description}
            </p>
          </div>
        </div>
        <Reviews/>
      </div>
    </div>
  );
}

export default OfferContainer;
