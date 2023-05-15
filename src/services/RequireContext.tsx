

import { parseCookies } from 'nookies';
import { Navigate, useLocation } from 'react-router-dom';

export function RequireAuth({ children }: { children: JSX.Element }) {

  const { 'tasklist.token': token } = parseCookies();


  let location = useLocation();

  if (!token) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
}