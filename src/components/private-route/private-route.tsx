import { Navigate } from 'react-router-dom';
import { UserAuthState } from './userAuthState';
import { useAppSelector } from '../../hooks/use-store';

type PrivateRouteProps = {
  children: JSX.Element;
};

export function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const userAuthState = useAppSelector((state) => state.authStatus);
  return userAuthState === UserAuthState.Auth ? children : <Navigate to={'/login'} />;
}
