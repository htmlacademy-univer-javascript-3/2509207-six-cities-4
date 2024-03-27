import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/components/app/app';
import { DefaultOffers } from './mocks/offers';
import { DefaultLocations } from './mocks/location';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={DefaultOffers} locations={DefaultLocations} />
  </React.StrictMode>
);

