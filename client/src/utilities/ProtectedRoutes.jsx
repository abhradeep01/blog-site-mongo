import { Navigate, Outlet } from 'react-router';

function ProtectedRoutes() {
    const user = null;
  
    return user? <Outlet/>:<Navigate to='/login' />
}

export default ProtectedRoutes