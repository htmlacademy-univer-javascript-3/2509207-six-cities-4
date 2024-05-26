import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/components/app/app';
import { DefaultLocations } from '../src/mocked-data';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App locations={DefaultLocations} />
  </React.StrictMode>
);

