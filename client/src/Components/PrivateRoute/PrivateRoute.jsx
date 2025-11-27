import { useSelector } from 'react-redux';
import { Loader } from '../Loader/Loader';
import { Navigate } from 'react-router';

export const PrivateRoute = ({ children }) => {
  const user = useSelector((store) => store.user);
  if (!user.roleName) return <Loader />;
  if (user.roleName !== 'admin') return <Navigate to={'/auth/login'} />;
  else return children;
};
