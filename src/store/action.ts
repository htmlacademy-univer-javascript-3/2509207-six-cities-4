import { createAction } from '@reduxjs/toolkit';
import { City } from './../types/location';
import { OfferProps } from '../types/offer';
import { SortType } from '../components/sort-options/sort-types';

export const pickCity = createAction<City>('app/pickCity');
export const filterOffers = createAction<OfferProps[] | undefined>('app/filterOffers');
export const setSortType = createAction<SortType>('app/setSortType');
