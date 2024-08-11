import {capitalizeFirstLetter, getAdultsCount, getBedroomsCount} from '../../../utils.ts';
import {OffersTypes, ReviewsTypes} from '../../../types/types.tsx';
import Reviews from './reviews.tsx';

type OfferContainerProps = {
  currentOffer: OffersTypes;
  reviews: ReviewsTypes[];
}

function OfferContainer({currentOffer, reviews}: OfferContainerProps): JSX.Element {
  return (
    <div className="offer__container container">
      <div className="offer__wrapper">
        {currentOffer.isPremium
          ?
          <div className="offer__mark">
            <span>Premium</span>
          </div>
          : null}
        <div className="offer__name-wrapper">
          <h1 className="offer__name">
            {currentOffer.title}
          </h1>
          <button className="offer__bookmark-button button" type="button">
            <svg className="offer__bookmark-icon" width={31} height={33}>
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">{currentOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="offer__rating rating">
          <div className="offer__stars rating__stars">
            <span style={{width: '80%'}}/>
            <span className="visually-hidden">Rating</span>
          </div>
          <span className="offer__rating-value rating__value">4.8</span>
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
              ?
              <span className="offer__user-status">Pro</span>
              : null}
          </div>
          <div className="offer__description">
            <p className="offer__text">
              {currentOffer.description}
            </p>
          </div>
        </div>
        <Reviews reviews={reviews}/>
      </div>
    </div>
  );
}

export default OfferContainer;
