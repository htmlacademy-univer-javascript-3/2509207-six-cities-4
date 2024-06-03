import { useParams, Link, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import ReviewForm from '../../components/review-form/review-form';
import { OfferInformation } from '../../components/offer/offer';
import { OfferProps, OfferReview, DetailedOfferProps } from '../../types/offer';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { fetchOfferDetails, fetchReviews, fetchNearbyOffers, addFavoriteOffer, fetchFavoriteOffers } from '../../store/action';
import NotFound from '../../components/error/404';
import Spinner from '../../components/spinner/spinner';
import { UserAuthState } from '../../components/private-route/userAuthState';
import { logout } from '../../store/action';


function PremiumBadge({ isPremium }: DetailedOfferProps): false | JSX.Element {
  return (
    isPremium && (
      <div className="offer__mark">
        <span>Premium</span>
      </div>
    )
  );
}

function ProBadge({ isPro }: { isPro: boolean }): false | JSX.Element {
  return (
    isPro && (
      <span className="offer__user-status">
        Pro
      </span>
    )
  );
}

function BookmarkButton({ isFavorite, onClick }: { isFavorite: boolean; onClick: () => void }) {
  const className = isFavorite ? 'offer__bookmark-button offer__bookmark-button--active button' : 'offer__bookmark-button button';
  return (
    <button className={className} type="button" onClick={onClick}>
      <svg className="offer__bookmark-icon" width="31" height="33">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

function HostDetails({ host, description }: DetailedOfferProps): JSX.Element {
  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
          <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
        </div>
        <span className="offer__user-name">
          {host.name}
        </span>
        <ProBadge isPro={host.isPro} />
      </div>
      <div className="offer__description">
        <p className="offer__text">
          {description}
        </p>
      </div>
    </div>
  );
}

function SingleReview({ review }: { review: OfferReview }): JSX.Element {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: review.rating * 20 }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={review.date}>{new Date(review.date).toDateString()}</time>
      </div>
    </li>
  );
}

function ReviewsSection({ reviews, id }: { reviews: OfferReview[]; id: string }): JSX.Element {
  const isAuthenticated = useAppSelector((state) => state.authStatus) === UserAuthState.Auth;
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => <SingleReview review={review} key={review.id} />)}
      </ul>
      {isAuthenticated && <ReviewForm id={id} />}
    </section>
  );
}

function NearbyPlace({ offer }: { offer: OfferProps }): JSX.Element {
  const offerLink = `/offer/${offer.id}`;
  return (
    <article className="near-places__card place-card">
      <div className="near-places__image-wrapper place-card__image-wrapper">
        <Link to={offerLink}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <OfferInformation offer={offer} offerLink={offerLink} />
    </article>
  );
}

function NearbyPlacesList({ offers }: { offers: OfferProps[] }): JSX.Element {
  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {offers.map((place) => (<NearbyPlace offer={place} key={place.id} />))}
        </div>
      </section>
    </div>
  );
}

function AmenitiesList({ goods }: DetailedOfferProps): JSX.Element {
  return (
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <ul className="offer__inside-list">
        {goods.map((good) => (<li className="offer__inside-item" key={good}>{good}</li>))}
      </ul>
    </div>
  );
}

function FeaturesList({ type, maxAdults, bedrooms }: DetailedOfferProps): JSX.Element {
  return (
    <ul className="offer__features">
      {type && <li className="offer__feature offer__feature--entire">{type}</li>}
      {maxAdults > 0 && <li className="offer__feature offer__feature--adults">Max {maxAdults} adults</li>}
      {bedrooms > 0 && <li className="offer__feature offer__feature--bedrooms">{bedrooms} Bedrooms</li>}
    </ul>
  );
}

function PhotosList({ images }: DetailedOfferProps): JSX.Element {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.map((image) => (
          <div className="offer__image-wrapper" key={image}>
            <img className="offer__image" src={image} alt="Photo studio" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OfferPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.loading);
  const offer = useAppSelector((state) => state.detailedOffer);
  const nearbyOffers = useAppSelector((state) => state.nearbyOffersList);
  const reviews = useAppSelector((state) => state.offerReviews);
  const userInfo = useAppSelector((state) => state.userInfo);
  const userAuthState = useAppSelector((state) => state.authStatus);
  const allOffers = useAppSelector((state) => state.offersList);
  const onAddOfferToFavorite = () => {
    if (offer) {
      dispatch(addFavoriteOffer({ id: offer.id, status: offer.isFavorite ? 0 : 1 }));
      dispatch(fetchFavoriteOffers());
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferDetails(id));
      dispatch(fetchNearbyOffers(id));
      dispatch(fetchReviews(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!offer) {
    return <NotFound />;
  }

  return (
    <div className="page" key={id}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to="/" className="header__logo-link">
                <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {userAuthState === UserAuthState.Auth ? (
                  <>
                    <li className="header__nav-item user">
                      <NavLink className="header__nav-link header__nav-link--profile" to="/favorites">
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                          <img src={userInfo?.avatarUrl} alt="User avatar" width="20" height="20" />
                        </div>
                        <span className="header__user-name user__name">{userInfo?.email}</span>
                        <span className="header__favorite-count">
                          {allOffers.filter((offer) => offer.isFavorite).length}
                        </span>
                      </NavLink>
                    </li>
                    <li className="header__nav-item">
                      <Link className="header__nav-link" to="#" onClick={() => dispatch(logout())}>
                        <span className="header__signout">Sign out</span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to="/login">
                      <span className="header__signout">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--offer">
        <section className="offer">
          <PhotosList {...offer} />
          <div className="offer__container container">
            <div className="offer__wrapper">
              <PremiumBadge {...offer} />
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <BookmarkButton isFavorite={offer.isFavorite} onClick={onAddOfferToFavorite} />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${offer.rating * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <FeaturesList {...offer} />
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <AmenitiesList {...offer} />
              <HostDetails {...offer} />
              <ReviewsSection reviews={reviews ?? []} id={id ?? ''} />
            </div>
          </div>
          <section className="offer__map map"></section>
        </section>
        <NearbyPlacesList offers={nearbyOffers ?? []} />
      </main>
    </div>
  );
}
