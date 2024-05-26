import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { DefaultLocations, DefaultOffers } from '../mocked-data';
import { OfferProps } from '../types/offer';
import { City } from '../types/location';
import { filterOffers, pickCity } from './action';
import { store } from '../store/index';

const INIT_LOCATION = DefaultLocations[3];

type initialStateType = {
  city: City;
  offers: OfferProps[];
}

const initialState: initialStateType = {
  city: INIT_LOCATION,
  offers: DefaultOffers.filter((offer) => offer.city.name === INIT_LOCATION.title),
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(pickCity, (state, action: PayloadAction<City>) => {
      state.city = action.payload;
      state.offers = DefaultOffers.filter((offer) => offer.city.name === state.city.title);
    })
    .addCase(filterOffers, (state, action: PayloadAction<OfferProps[] | undefined>) => {
      state.offers = action.payload ?? [];
    });
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
