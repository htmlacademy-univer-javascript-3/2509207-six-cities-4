import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Hub from '../../pages/mainpage/mainpage';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import NotFound from '../error/404';
import { PrivateRoute } from '../private-route/private-route';
import { UserAuthState } from '../private-route/userAuthState';


export default function App(props: { count: number }): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Hub {...props} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/favorites' element={<PrivateRoute userAuthState={UserAuthState.UnAuth}><Favorites /></PrivateRoute>} />
        <Route path='/offer/:id' element={<Offer />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}