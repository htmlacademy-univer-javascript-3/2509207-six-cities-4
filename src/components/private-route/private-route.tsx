import { Navigate } from 'react-router-dom';
import { UserAuthState } from './userAuthState';


type PrivateRouteProps = {
    children: JSX.Element;
    userAuthState: UserAuthState;
};

export function PrivateRoute({ children, userAuthState }: PrivateRouteProps): JSX.Element {
  return userAuthState === UserAuthState.Auth ? children : <Navigate to={'/login'} />;
}
