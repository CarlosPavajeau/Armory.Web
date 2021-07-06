import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../../common/hooks';
import { selectIsAuthenticate } from '../../modules/users/Slice';
import Routes from './Routes';

const Location = () => {
  const history = useHistory();
  const location = useLocation();
  const isAuth = useAppSelector(selectIsAuthenticate);

  useEffect(() => {
    if (!isAuth) {
      if (location.pathname !== '/login') {
        history.push('/login');
      }
    }
  }, [isAuth, location, history]);

  return <Routes />;
};

export default Location;
