import { ReactElement, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useAppSelector } from '../../common/hooks';
import { selectIsAuthenticate } from '../../modules/users/Slice';
import Routes from './Routes';

const Location = (): ReactElement => {
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
