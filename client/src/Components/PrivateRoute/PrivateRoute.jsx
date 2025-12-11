import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../Loader/Loader';
import { useNavigate } from 'react-router';
import { goToErrorPage } from '../../Store/appReducer';

export const PrivateRoute = ({ children, accessedRoles = ['admin'] }) => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const isLoadingUser = useSelector((store) => store.user.isLoadingUser);
  const navigate = useNavigate();

  if (isLoadingUser) return <Loader />;
  if (!user.roleName) navigate('/auth/login');
  if (!accessedRoles.includes(user.roleName))
    dispatch(goToErrorPage('Недостаточно прав'));
  else return children;
};
