import { City } from './../types/location';
import { OfferProps, OfferReview, DetailedOfferProps } from '../types/offer';
import { SortType } from '../components/sort-options/sort-types';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from './reducer';
 
  export type ReviewData = {
    comment: string;
    rating: number;
  };
  
  export type ReviewDataApi = ReviewData & {
    id: string;
  };
  
  export const selectCity = createAction<City>('app/selectCity');
  export const filterOffers = createAction<OfferProps[] | undefined>('app/filterOffers');
  export const setDetailedOffer = createAction<DetailedOfferProps | undefined>('app/setDetailedOffer');
  export const updateNearbyOffers = createAction<OfferProps[] | undefined>('app/updateNearbyOffers');
  export const updateOfferReviews = createAction<OfferReview[] | undefined>('app/updateOfferReviews');
  export const setSortType = createAction<SortType>('app/setSortType');
  
  type ThunkConfig = { dispatch: AppDispatch; state: State; extra: AxiosInstance };
  
  export const fetchAllOffers = createAsyncThunk<void, undefined, ThunkConfig>(
    'data/fetchOffers   ',
    async (_, { dispatch, extra: api }) => {
      const { data } = await api.get<OfferProps[]>('/offers');
      dispatch(filterOffers(data));
    }
  );
  
  export const fetchOfferDetails = createAsyncThunk<void, string, ThunkConfig>(
    'data/fetchOfferDetails',
    async (offerId, { dispatch, extra: api }) => {
      const { data } = await api.get<DetailedOfferProps>(`/offers/${offerId}`);
      dispatch(setDetailedOffer(data));
    }
  );
  
  export const fetchNearbyOffers = createAsyncThunk<void, string, ThunkConfig>(
    'data/fetchNearbyOffers',
    async (offerId, { dispatch, extra: api }) => {
      const { data } = await api.get<OfferProps[]>(`/offers/${offerId}/nearby`);
      dispatch(updateNearbyOffers(data));
    }
  );
  
  export const fetchReviews = createAsyncThunk<void, string, ThunkConfig>(
    'data/fetchReviews',
    async (offerId, { dispatch, extra: api }) => {
      const { data } = await api.get<OfferReview[]>(`/comments/${offerId}`);
      dispatch(updateOfferReviews(data));
    }
  );
  
  export const addReview = createAsyncThunk<void, ReviewDataApi, ThunkConfig>(
    'data/addReview',
    async (reviewData, { dispatch, extra: api, getState }) => {
      const { data } = await api.post<OfferReview>(`/comments/${reviewData.id}`, reviewData as ReviewData);
      const existingReviews = getState().offerReviews ?? [];
      dispatch(updateOfferReviews([data, ...existingReviews]));
    }
  );
  