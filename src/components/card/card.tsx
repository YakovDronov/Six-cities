import {Link, useNavigate} from 'react-router-dom';
import {APIRoute, AppRoute, AuthorizationStatus} from '../../const.ts';
import {capitalizeFirstLetter} from '../../utils.ts';
import {OfferTypes, ShortOfferTypes} from '../../types/types.tsx';
import {useAppSelector} from '../../store/actions.ts';
import {api, store} from '../../store';
import {fetchOffersAction} from '../../store/api-actions.ts';

type CardProps = {
  data: ShortOfferTypes;
  onHandlerChangeIdActiveCard?: () => void;
  onHandlerRemoveIdActiveCard?: () => void;
  type?: 'favorites' | 'near-places';
}

function Card({data, onHandlerChangeIdActiveCard, onHandlerRemoveIdActiveCard, type}: CardProps): JSX.Element {
  const imgWidth: string = type === 'favorites' ? '150' : '260';
  const imgHeight: string = type === 'favorites' ? '110' : '200';
  const authorizationStatus = useAppSelector((state) => state.authorizationReducer.authorizationStatus);
  const navigate = useNavigate();
  const onHandleFavorite = async () => {
    try {
      const offerStatus = !data?.isFavorite;
      const status = Number(offerStatus);
      await api.post<OfferTypes[]>(`${APIRoute.Favorite}/${data.id}/${status}`);
      store.dispatch(fetchOffersAction());
    } catch {
      navigate(AppRoute.Error);
    }
  };

  const onHandleClickFavorite = () => {
    onHandleFavorite();
  };

  return (
    <article
      className={`${type === 'favorites' ? 'favorites' : 'near-places'}__card place-card`}
      onMouseEnter={onHandlerChangeIdActiveCard && onHandlerChangeIdActiveCard}
      onMouseLeave={onHandlerRemoveIdActiveCard && onHandlerRemoveIdActiveCard}
    >
      {data.isPremium
        &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`${type === 'favorites' ? 'favorites' : 'near-places'}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.OfferStatic}/${data.id}`}>
          <img className="place-card__image" src={data.previewImage} width={imgWidth} height={imgHeight}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{data.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {authorizationStatus === AuthorizationStatus.Auth
            &&
          <button
            className={`place-card__bookmark-button button ${data.isFavorite && 'place-card__bookmark-button--active'}`}
            type="button"
            onClick={onHandleClickFavorite}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{data.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>}
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${data.rating / 5 * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.OfferStatic}/${data.id}`}>{data.title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(data.type)}</p>
      </div>
    </article>
  );
}

export default Card;
