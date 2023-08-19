import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';

export const RouteVisibility = ({routePrivate, children}) => {

    const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken()
  }, []);


  if (status === 'checking') {
    return <h3>Loading...</h3>
  }
    
  
  return  !routePrivate ?
  (status === 'not-authenticated' ? children : <Navigate to="/calendar" replace/> ) :
  (status === 'authenticated' ? children : <Navigate to="/auth/login" replace/>)
  
}
