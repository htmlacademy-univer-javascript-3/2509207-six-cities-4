import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { DefaultLocations, DefaultOffers } from '../mocked-data';
import { OfferProps } from '../types/offer';
import { City } from '../types/location';
import { filterOffers, pickCity, setSortType } from './action';
import { store } from '../store/index';
import { SortType } from '../components/sort-options/sort-types';

const INITIAL_CITY = DefaultLocations[3];

type StateType = {
  city: City;
  offers: OfferProps[];
  sortType: SortType;
};

const initialState: StateType = {
  city: INITIAL_CITY,
  offers: DefaultOffers.filter((offer) => offer.city.name === INITIAL_CITY.title),
  sortType: SortType.Popular,
};

const sortOffers = (offers: OfferProps[], sortType: SortType): OfferProps[] => {
  switch (sortType) {
    case SortType.PriceAsc:
      return [...offers].sort((a, b) => a.price - b.price);
    case SortType.PriceDesc:
      return [...offers].sort((a, b) => b.price - a.price);
    case SortType.Rating:
      return [...offers].sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(pickCity, (state, action: PayloadAction<City>) => {
      state.city = action.payload ?? [];
      state.offers = sortOffers(
        DefaultOffers.filter((offer) => offer.city.name === state.city.title),
        state.sortType);
    })
    .addCase(filterOffers, (state, action: PayloadAction<OfferProps[] | undefined>) => {
      state.offers = sortOffers(action.payload ?? [], state.sortType);
    })
    .addCase(setSortType, (state, action) => {
      state.sortType = action.payload;
      state.offers = sortOffers(state.offers, state.sortType);
    });
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
