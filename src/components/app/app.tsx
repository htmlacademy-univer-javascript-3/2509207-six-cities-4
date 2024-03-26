import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Hub from '../../pages/mainpage/mainpage';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import NotFound from '../error/404';
import { PrivateRoute } from '../private-route/private-route';
import { UserAuthState } from '../private-route/userAuthState';

import { OfferProps } from '../offer/offer';

export default function App(props: { offers: OfferProps[]; locations: string[] }): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Hub {...props} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/favorites' element={<PrivateRoute userAuthState={UserAuthState.Auth}><Favorites favoriteOffers={props.offers}/></PrivateRoute>} />
        <Route path='/offer/:id' element={<Offer />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
