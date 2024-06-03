import { City } from './../types/location';
import { OfferProps, OfferReview, DetailedOfferProps } from '../types/offer';
import { SortType } from '../components/sort-options/sort-types';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from './reducer';
import { UserAuthState } from '../components/private-route/userAuthState';
import { UserInfo } from '../components/private-route/user-info';

export type ReviewData = {
    comment: string;
    rating: number;
  };

export type ReviewDataApi = ReviewData & {
    id: string;
  };

export type AddFavoriteOfferModelApi = {
    id: string;
    status: number;
  };

export const selectCity = createAction<City>('app/selectCity');
export const filterOffers = createAction<OfferProps[] | undefined>('app/filterOffers');
export const setDetailedOffer = createAction<DetailedOfferProps | undefined>('app/setDetailedOffer');
export const updateNearbyOffers = createAction<OfferProps[] | undefined>('app/updateNearbyOffers');
export const updateOfferReviews = createAction<OfferReview[] | undefined>('app/updateOfferReviews');
export const setSortType = createAction<SortType>('app/setSortType');
export const setAuthorizationStatus = createAction<UserAuthState>('auth/setAuthorizationStatus');
export const setUserInfo = createAction<UserInfo | undefined>('auth/setUserInfo');
export const setFavoriteOffers = createAction<OfferProps[]>('app/setFavoriteOffers');

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
  async (reviewData, { dispatch, extra: api }) => {
    const { status } = await api.post<OfferReview>(`/comments/${reviewData.id}`, { rating: reviewData.rating, comment: reviewData.comment });
    if(status === 201) {
      dispatch(fetchReviews(reviewData.id));
    }
  });


export const fetchFavoriteOffers = createAsyncThunk<void, undefined, ThunkConfig>(
  'data/fetchFavoriteOffers',
  async (_, { dispatch, extra: api }) => {
    const { data } = await api.get<OfferProps[]>('/favorite');
    dispatch(setFavoriteOffers(data));
  }
);

export const addFavoriteOffer = createAsyncThunk<void, AddFavoriteOfferModelApi, ThunkConfig>(
  'data/addFavoriteOffer',
  async (model, { dispatch, extra: api }) => {
    await api.post<OfferProps[]>(`/favorite/${model.id}/${model.status}`);
    dispatch(fetchFavoriteOffers());
  }
);

export const checkAuth = createAsyncThunk<void, undefined, ThunkConfig>(
  'auth/checkAuth',
  async (_, { dispatch, extra: api }) => {
    api.defaults.headers.common['X-Token'] = localStorage.getItem('token');
    const { data } = await api.get<UserInfo>('/login');
    if (data) {
      dispatch(setAuthorizationStatus(UserAuthState.Auth));
      dispatch(setUserInfo(data));
    } else {
      dispatch(setAuthorizationStatus(UserAuthState.UnAuth));
    }
  }
);

export const login = createAsyncThunk<void, { email: string; password: string }, ThunkConfig>(
  'auth/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserInfo>('/login', { email, password });
    if (data) {
      localStorage.setItem('token', data.token);
      api.defaults.headers.common['X-Token'] = data.token;
      dispatch(setAuthorizationStatus(UserAuthState.Auth));
      dispatch(setUserInfo(data));
    }
  }
);

export const logout = createAsyncThunk<void, undefined, ThunkConfig>(
  'auth/logout',
  async (_, { dispatch, extra: api }) => {
    const { status } = await api.delete<UserInfo>('/logout');
    if (status === 204) {
      api.defaults.headers.common['X-Token'] = null;
      localStorage.removeItem('token');
      dispatch(setAuthorizationStatus(UserAuthState.UnAuth));
      dispatch(setUserInfo(undefined));
    }
  }
);
