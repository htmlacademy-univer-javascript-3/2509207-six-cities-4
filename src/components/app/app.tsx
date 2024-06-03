import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Hub from '../../pages/mainpage/mainpage';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/mainpage/offer';
import NotFound from '../error/404';
import { PrivateRoute } from '../private-route/private-route';
import { store } from '../../store';
import { City } from '../../types/location';

export default function App(props: { locations: City[] }): JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Hub {...props} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/favorites' element={<PrivateRoute><Favorites favoriteOffers={[]} /></PrivateRoute>} />
          <Route path='/offer/:id' element={<Offer />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>

  );
}
