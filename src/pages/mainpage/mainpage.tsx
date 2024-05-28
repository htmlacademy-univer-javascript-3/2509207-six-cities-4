import { useState, useEffect } from 'react';
import Offer from '../../components/offer/offer';
import Map from '../../components/offer/map';
import { OfferProps } from '../../types/offer';
import { City, Point } from '../../types/location';
import { useAppSelector, useAppDispatch } from '../../hooks/use-store';
import { fetchAllOffers, selectCity } from '../../store/action';
import cn from 'classnames';
import SortOptions from '../../components/sort-options/sort-options';
import { SortType } from '../../components/sort-options/sort-types';
import Spinner from '../../components/spinner/spinner';
import { createSelector } from 'reselect';

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

const getPointFromOffer = (offer: OfferProps | undefined): Point | undefined => {
  if (!offer) return undefined;
  return {
    latitude: offer.location.latitude,
    longitude: offer.location.longitude,
    title: offer.id,
  };
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
            <Map selectedPoint={getPointFromOffer(activeOffer)} city={currentLocation} points={offers.map(getPointFromOffer).filter((p: Point | undefined): p is Point => p !== undefined)} />
          </div>
        </div>
      </div>
    </main>
  );
}
