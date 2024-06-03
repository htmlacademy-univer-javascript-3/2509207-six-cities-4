import { OfferProps } from '../../types/offer';
import { FavoriteOffer } from '../../components/offer/offer';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/use-store';
import { logout, fetchFavoriteOffers } from '../../store/action';
import { useEffect } from 'react';
import { DefaultLocations } from '../../mocked-data';
import { UserAuthState } from '../../components/private-route/userAuthState';

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
  const offersByCity: Record<string, OfferProps[]> = offers.reduce<Record<string, OfferProps[]>>((res: Record<string, OfferProps[]>, a: OfferProps) => {
    res[a.city.name] = res[a.city.name] || [];
    res[a.city.name].push(a);
    return res;
  }, {});

  return (
    <ul className="favorites__list">
      {
        DefaultLocations.map((location) => offersByCity[location.title] && (
          <ListCityFavoriteOffers offers={offersByCity[location.title]} key={location.title}/>
        ))
      }
    </ul>
  );
}

function Favorites(): JSX.Element {
  const dispatch = useAppDispatch();
  const userAuthState = useAppSelector((state) => state.authStatus);
  const userInfo = useAppSelector((state) => state.userInfo);
  const allOffers = useAppSelector((state) => state.offersList);
  const favoriteOffers = useAppSelector((state) => state.favoriteOffers) ?? [];

  useEffect(() => {
    dispatch(fetchFavoriteOffers());
  }, [dispatch]);
  
  return (
    <div className="page">
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
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ListFavoriteOffers offers={favoriteOffers} />
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link to="/" className="footer__logo-link">
          <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}


export default Favorites;
