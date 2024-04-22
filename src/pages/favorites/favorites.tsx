import { OfferProps } from '../../types/offer';
import { FavoriteOffer } from '../../components/offer/offer';


function ListCityFavoriteOffers({ offers }: { offers: OfferProps[] }): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{offers[0].city.name}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {
          offers.map((e) => (
            <FavoriteOffer offer={e} key={e.id} />
          ))
        }
      </div>
    </li>
  );
}

function ListFavoriteOffers({ offers }: { offers: OfferProps[] }): JSX.Element {
  const offersByCities = [offers];
  return (
    <ul className="favorites__list">
      {
        offersByCities.map((offersByCity) => (
          <ListCityFavoriteOffers offers={offersByCity} key={(offersByCity)[0].city.name} />
        ))
      }
    </ul>
  );
}

function Favorites({ favoriteOffers }: { favoriteOffers: OfferProps[] }): JSX.Element {
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
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ListFavoriteOffers offers={favoriteOffers} />
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="markup/main.html">
          <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo"
            width="64" height="33"
          />
        </a>
      </footer>
    </div>
  );
}

export default Favorites;
