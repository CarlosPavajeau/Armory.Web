import { ConfigureGlobalError } from 'common/config/http';
import { useAppDispatch } from 'common/hooks';
import { useAuth } from 'modules/auth/hooks';
import { ReactElement, useEffect } from 'react';

import Router from './routes';
import ThemeConfig from './shared/theme';

const App = (): ReactElement => {
  const isAuth = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    ConfigureGlobalError(dispatch);
  }, [dispatch]);

  return (
    <ThemeConfig>
      <Router isAuth={isAuth} />
    </ThemeConfig>
  );
};
export default App;
