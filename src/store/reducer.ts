import { createReducer } from '@reduxjs/toolkit';
import { DefaultLocations } from '../mocked-data';
import { OfferProps, OfferReview, DetailedOfferProps } from '../types/offer';
import { City } from '../types/location';
import { 
  filterOffers,
  selectCity,
  setSortType,
  fetchAllOffers,
  setDetailedOffer,
  fetchOfferDetails,
  updateNearbyOffers,
  fetchNearbyOffers,
  updateOfferReviews,
  fetchReviews 
} from './action';
import { store } from '../store/index';
import { SortType } from '../components/sort-options/sort-types';
import { UserAuthState } from '../components/private-route/userAuthState';

interface AppState {
  selectedCity: City;
  offersList: OfferProps[];
  sortType: SortType;
  detailedOffer?: DetailedOfferProps;
  nearbyOffersList?: OfferProps[];
  offerReviews?: OfferReview[];
  authStatus: UserAuthState;
  loading: boolean;
}

const initialAppState: AppState = {
  selectedCity: DefaultLocations[3],
  offersList: [],
  sortType: SortType.Popular,
  loading: false,
  detailedOffer: undefined,
  nearbyOffersList: undefined,
  offerReviews: undefined,
  authStatus: UserAuthState.Empty
};

export const reducer = createReducer(initialAppState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.selectedCity = action.payload;
      state.loading = false;
    })
    .addCase(filterOffers, (state, action) => {
      state.offersList = action.payload ?? [];
      state.loading = false;
    })
    .addCase(setDetailedOffer, (state, action) => {
      state.detailedOffer = action.payload;
      state.loading = false;
    })
    .addCase(updateNearbyOffers, (state, action) => {
      state.nearbyOffersList = action.payload;
      state.loading = false;
    })
    .addCase(updateOfferReviews, (state, action) => {
      state.offerReviews = action.payload;
      state.loading = false;
    })
    .addCase(setSortType, (state, action) => {
      state.sortType = action.payload;
      state.loading = false;
    })
    .addCase(fetchAllOffers.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchAllOffers.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(fetchOfferDetails.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchOfferDetails.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(fetchNearbyOffers.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchNearbyOffers.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(fetchReviews.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchReviews.fulfilled, (state) => {
      state.loading = false;
    });
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
