import { Link } from 'react-router-dom';
import { OfferProps } from '../../types/offer';
import { useAppDispatch } from '../../hooks/use-store';
import { addFavoriteOffer, fetchFavoriteOffers } from '../../store/action';

function Premium({ isPremium }: OfferProps): false | JSX.Element {
  return (
    isPremium && (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    )
  );
}

function BookmarkButton({ isFavorite, onClick }: { isFavorite: boolean; onClick: () => void }) {
  const className = isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button';
  return (
    <button className={className} type="button" onClick={onClick}>
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export function OfferInformation({ offer, offerLink }: { offer: OfferProps; offerLink: string }): JSX.Element {
  const dispatch = useAppDispatch();

  const onAddOfferToFavorite = () => {
    dispatch(addFavoriteOffer({ id: offer.id, status: offer.isFavorite ? 0 : 1 }));
    dispatch(fetchFavoriteOffers());
  };

  return (
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{offer.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <BookmarkButton isFavorite={offer.isFavorite} onClick={onAddOfferToFavorite} />
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{ width: offer.rating * 20 }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={offerLink}>
          {offer.title}
        </Link>
      </h2>
      <p className="place-card__type">{offer.type}</p>
    </div>
  );
}

export default function Offer({ offer, setState }: { offer: OfferProps; setState: () => void }): JSX.Element {
  const offerLink = `/offer/${offer.id}`;
  return (
    <article className="cities__card place-card" onMouseOver={setState}>
      <Premium {...offer} />
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={offerLink}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <OfferInformation offer={offer} offerLink={offerLink} />

    </article>
  );
}

export function FavoriteOffer({ offer }: { offer: OfferProps }): JSX.Element {
  const dispatch = useAppDispatch();

  const onRemoveFromFavorite = () => {
    dispatch(addFavoriteOffer({ id: offer.id, status: 0 }));
    dispatch(fetchFavoriteOffers());
  };
  const offerLink = `/offer/${offer.id}`;
  return (
    <article className="favorites__card place-card">
      <Premium {...offer} />
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={offerLink}>
          <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place image" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton isFavorite={offer.isFavorite} onClick={onRemoveFromFavorite} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: offer.rating * 20 }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerLink}>
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}


