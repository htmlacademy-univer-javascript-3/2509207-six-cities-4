import { useState } from 'react';
import Offer from '../../components/offer/offer';
import { OfferProps } from '../../components/offer/offer';


function ListLocations({ locations }: { locations: string[] }): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            locations.map((location) =>
              (
                <li className="locations__item" key={location}>
                  <a className="locations__item-link tabs__item" href="#">
                    <span>{location}</span>
                  </a>
                </li>)
            )
          }
        </ul>
      </section>
    </div>
  );
}

function ListOffers({ offers }: {offers: OfferProps[]}): JSX.Element {
  const [activeOffer, setActiveOffer] = useState(offers[0]);
  console.log(activeOffer.id);
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((e) => (
          <Offer offer={e} setState={() => setActiveOffer(e)} key={e.id}/>
        ))
      }
    </div>
  );
}

function Hub({ offers, locations }: { offers: OfferProps[]; locations: string[] }): JSX.Element {
  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <ListLocations locations={locations}/>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">312 places to stay in Amsterdam</b>
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
            <ListOffers offers={offers} />
          </section>
          <div className="cities__right-section">
            <section className="cities__map map"></section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Hub;
