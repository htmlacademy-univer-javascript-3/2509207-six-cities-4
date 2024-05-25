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

type LocationItemProps = {
  title: string;
  isActive: boolean;
  onClick: (city: string) => void;
};

const GroupOffersByCity = (offers: OfferProps[]): Dictionary<OfferProps[]> => {
  return offers.reduce((acc, offer) => {
    if (!acc[offer.city.name]) {
      acc[offer.city.name] = [];
    }
    acc[offer.city.name]?.push(offer);
    return acc;
  }, {} as Dictionary<OfferProps[]>);
};

const LocationItem = ({ title, isActive, onClick }: LocationItemProps): JSX.Element => {
  return (
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
};

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
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
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
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                <li className="places__option" tabIndex={0}>Price: low to high</li>
                <li className="places__option" tabIndex={0}>Price: high to low</li>
                <li className="places__option" tabIndex={0}>Top rated first</li>
              </ul>
            </form>
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
