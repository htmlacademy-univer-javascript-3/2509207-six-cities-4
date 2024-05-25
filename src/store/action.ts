import { createAction } from '@reduxjs/toolkit';
import { City } from './../types/location';
import { OfferProps } from '../types/offer';

export const pickCity = createAction<City>('app/pickCity');
export const filterOffers = createAction<OfferProps[] | undefined>('app/filterOffers');
