import { useState } from 'react';
import Offer from '../../components/offer/offer';
import Map from '../../components/offer/map';
import { OfferProps } from '../../types/offer';
import { City, Point } from '../../types/location';
import { useAppSelector, useAppDispatch } from '../../hooks/use-store';
import { filterOffers, pickCity } from '../../store/action';
import { DefaultOffers } from '../../mocked-data';
import cn from 'classnames';
import { Dictionary } from '@reduxjs/toolkit';
import SortOptions from '../../components/sort-options/sort-options';
import { SortType } from '../../components/sort-options/sort-types';


type LocationItemProps = {
  title: string;
  isActive: boolean;
  onClick: (city: string) => void;
};

const GroupOffersByCity = (offers: OfferProps[]): Dictionary<OfferProps[]> => offers.reduce((acc, offer) => {
  if (!acc[offer.city.name]) {
    acc[offer.city.name] = [];
  }
  acc[offer.city.name]?.push(offer);
  return acc;
}, {} as Dictionary<OfferProps[]>);

const LocationItem = ({ title, isActive, onClick }: LocationItemProps): JSX.Element => (
  <li className="locations__item">
    <a
      href="#"
      className={cn('locations__item-link', 'tabs__item', { 'tabs__item--active': isActive })}
      onClick={(e) => {
        e.preventDefault();
        onClick(title);
      }}
    >
      <span>{title}</span>
    </a>
  </li>
);

const ListLocations = ({ locations }: { locations: City[] }): JSX.Element => {
  const currentLocation = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();
  const offersByCity = GroupOffersByCity(DefaultOffers);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {locations.map((city) => (
            <LocationItem
              key={city.title}
              title={city.title}
              isActive={city.title === currentLocation.title}
              onClick={(cityName: string) => {
                const selectedCity = locations.find((c) => c.title === cityName);
                if (selectedCity) {
                  dispatch(pickCity(selectedCity));
                  dispatch(filterOffers(offersByCity[cityName] || []));
                }
              }}
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

const GetPointFromOffer = (offer: OfferProps): Point => ({
  latitude: offer.location.latitude,
  longitude: offer.location.longitude,
  title: offer.id,
});

export default function Hub({ locations }: { locations: City[] }): JSX.Element {
  const currentLocation = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const [activeOffer, setActiveOffer] = useState(offers[0]);

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
            <Map selectedPoint={GetPointFromOffer(activeOffer)} city={currentLocation} points={offers.map(GetPointFromOffer)} />
          </div>
        </div>
      </div>
    </main>
  );
}
