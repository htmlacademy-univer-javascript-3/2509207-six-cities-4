import { useState, useEffect } from 'react';
import Offer from '../../components/offer/offer';
import Map from '../../components/offer/map';
import { OfferProps } from '../../types/offer';
import { City } from '../../types/location';
import { useAppSelector, useAppDispatch } from '../../hooks/use-store';
import { fetchAllOffers, logout, selectCity } from '../../store/action';
import cn from 'classnames';
import SortOptions from '../../components/sort-options/sort-options';
import { SortType } from '../../components/sort-options/sort-types';
import Spinner from '../../components/spinner/spinner';
import { createSelector } from 'reselect';
import { UserAuthState } from '../../components/private-route/userAuthState';
import { Link, NavLink } from 'react-router-dom';

type LocationItemProps = {
  title: string;
  isActive: boolean;
  onClick: (city: string) => void;
};

const LocationItem = ({ title, isActive, onClick }: LocationItemProps): JSX.Element => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick(title);
  };

  return (
    <li className="locations__item">
      <a
        href="#"
        className={cn('locations__item-link', 'tabs__item', { 'tabs__item--active': isActive })}
        onClick={handleClick}
      >
        <span>{title}</span>
      </a>
    </li>
  );
};

const ListLocations = ({ locations }: { locations: City[] }): JSX.Element => {
  const currentLocation = useAppSelector((state) => state.selectedCity);
  const dispatch = useAppDispatch();

  const handleLocationClick = (cityName: string) => {
    const city = locations.find((loc) => loc.title === cityName);
    if (city) {
      dispatch(selectCity(city));
      dispatch(fetchAllOffers());
    }
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {locations.map((city) => (
            <LocationItem
              key={city.title}
              title={city.title}
              isActive={city.title === currentLocation.title}
              onClick={handleLocationClick}
            />
          ))}
        </ul>
      </section>
    </div>
  );
};

const ListOffers = ({ offers, setActiveOffer }: { offers: OfferProps[]; setActiveOffer: (offer: OfferProps) => void }): JSX.Element => {
  const selectedSortStrategy = useAppSelector((state) => state.sortType);
  const sortedOffers = [...offers];

  switch (selectedSortStrategy) {
    case SortType.PriceAsc:
      sortedOffers.sort((a, b) => a.price - b.price);
      break;
    case SortType.PriceDesc:
      sortedOffers.sort((a, b) => b.price - a.price);
      break;
    case SortType.Rating:
      sortedOffers.sort((a, b) => b.rating - a.rating);
      break;
  }

  return (
    <div className="cities__places-list places__list tabs__content">
      {sortedOffers.map((offer) => (
        <Offer offer={offer} setState={() => setActiveOffer(offer)} key={offer.id} />
      ))}
    </div>
  );
};


const selectFilteredOffers = createSelector(
  [(state) => state.offersList, (state) => state.selectedCity],
  (offersList, selectedCity) => offersList.filter((offer: OfferProps) => offer.city.name === selectedCity.title)
);

export default function Hub({ locations }: { locations: City[] }): JSX.Element {
  const dispatch = useAppDispatch();
  const currentLocation = useAppSelector((state) => state.selectedCity);
  const offers = useAppSelector(selectFilteredOffers);
  const [activeOffer, setActiveOffer] = useState<OfferProps | undefined>(undefined);
  const isLoading = useAppSelector((state) => state.loading);
  const userInfo = useAppSelector((state) => state.userInfo);
  const userAuthState = useAppSelector((state) => state.authStatus);
  const allOffers = useAppSelector((state) => state.offersList);

  useEffect(() => {
    dispatch(fetchAllOffers());
  }, [dispatch]);

  useEffect(() => {
    if (offers.length > 0) {
      setActiveOffer(offers[0]);
    }
  }, [offers]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className="page__main page__main--index">
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
      <h1 className="visually-hidden">Cities</h1>
      <ListLocations locations={locations} />
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in {currentLocation.title}</b>
            <SortOptions />
            <ListOffers offers={offers} setActiveOffer={setActiveOffer} />
          </section>
          <div className="cities__right-section">
            <Map highlightedOffer={activeOffer} city={currentLocation} offers={offers} pageType="cities"/>
          </div>
        </div>
      </div>
    </main>
  );
}
