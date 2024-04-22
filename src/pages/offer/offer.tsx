import ReviewForm from '../../components/review-form/review-form';
import { Link } from 'react-router-dom';
import { OfferWithDetailsMock } from '../../mocks/offers';
import { OfferInformation } from '../../components/offer/offer';
import { OfferProps, DetailedOfferProps } from '../../types/offer';

function Premium({ isPremium }: DetailedOfferProps): false | JSX.Element {
  return (
    isPremium && (
      <div className="offer__mark">
        <span>Premium</span>
      </div>
    )
  );
}

function Pro({ host }: DetailedOfferProps): false | JSX.Element {
  return (
    host.isPro && (
      <span className="offer__user-status">
        Pro
      </span>
    )
  );
}

function Host(offer: DetailedOfferProps): JSX.Element {
  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
          <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
        </div>
        <span className="offer__user-name">
          {offer.host.name}
        </span>
        <Pro {...offer} />
      </div>
      <div className="offer__description">
        <p className="offer__text">
          A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
        </p>
        <p className="offer__text">
          An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
        </p>
      </div>
    </div>
  )
}

function Reviews(): JSX.Element {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
      <ul className="reviews__list">
        <li className="reviews__item">
          <div className="reviews__user user">
            <div className="reviews__avatar-wrapper user__avatar-wrapper">
              <img className="reviews__avatar user__avatar" src="img/avatar-max.jpg" width="54" height="54" alt="Reviews avatar" />
            </div>
            <span className="reviews__user-name">
              Max
            </span>
          </div>
          <div className="reviews__info">
            <div className="reviews__rating rating">
              <div className="reviews__stars rating__stars">
                <span style={{ width: '80%' }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <p className="reviews__text">
              A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
            </p>
            <time className="reviews__time" dateTime="2019-04-24">April 2019</time>
          </div>
        </li>
      </ul>
      <ReviewForm />
    </section>
  )
}

function NearPlace(offer: OfferProps): JSX.Element {
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
  )
}

function ListNearPlaces(): JSX.Element {
  const nearPlacesMock: OfferProps[] = [OfferWithDetailsMock, OfferWithDetailsMock, OfferWithDetailsMock] as OfferProps[];
  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {
            nearPlacesMock.map((place) => (<NearPlace {...place} key={place.id} />))
          }
        </div>
      </section>
    </div>
  )
}

function ListGoods({ goods }: DetailedOfferProps): JSX.Element {
  return (
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <ul className="offer__inside-list">
        {
          goods.map((good) => (<li className="offer__inside-item">key={good}</li>))
        }
      </ul>
    </div>
  )
}

function ListFeatures(offer: DetailedOfferProps): JSX.Element {
  return (
    <ul className="offer__features">
      {
        offer.type && <li className="offer__feature offer__feature--entire">{offer.type}</li>
      }
      {
        offer.maxAdults > 0 && <li className="offer__feature offer__feature--adults">Max {offer.maxAdults} adults</li>
      }
      {
        offer.bedrooms > 0 && <li className="offer__feature offer__feature--bedrooms">{offer.bedrooms} Bedrooms</li>
      }
    </ul>
  )
}

function ListOfferPhotos({ images }: DetailedOfferProps): JSX.Element {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {
          images.map((image) => (
            <div className="offer__image-wrapper" key={image}>
              <img className="offer__image" src={image} alt="Photo studio" />
            </div>))
        }
      </div>
    </div>
  );
}

export default function OfferDetailed(): JSX.Element {
  const offer: DetailedOfferProps = OfferWithDetailsMock;
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="markup/main.html">
                <img className="header__logo" src="/img/logo.svg"
                  alt="6 cities logo" width="81" height="41"
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div
                      className="header__avatar-wrapper user__avatar-wrapper"
                    >
                    </div>
                    <span
                      className="header__user-name user__name"
                    >Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <ListOfferPhotos {...offer} />
          <div className="offer__container container">
            <div className="offer__wrapper">
              <Premium {...offer} />
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${offer.rating * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ListFeatures {...offer} />
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <ListGoods {...offer} />
              <Host {...offer} />
              <Reviews />
            </div>
          </div>
          <section className="offer__map map"></section>
        </section>
        <ListNearPlaces />
      </main>
    </div>
  );
}

