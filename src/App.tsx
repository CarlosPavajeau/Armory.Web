import { ReactElement, useEffect } from 'react';

import { useAppSelector } from './common/hooks';
import Storage from './common/plugins/Storage';
import { selectIsAuth, selectPayload } from './modules/auth/Slice';
import Router from './routes';
import ThemeConfig from './shared/theme';

const App = (): ReactElement => {
  const payload = useAppSelector(selectPayload);
  const isAuth = useAppSelector(selectIsAuth);

  useEffect(() => {
    if (payload.isAuthenticate && payload.token) {
      Storage.set('user_token', payload.token);
    } else {
      Storage.remove('user_token');
    }
  }, [payload]);

  return (
    <ThemeConfig>
      <Router isAuth={isAuth} />
    </ThemeConfig>
  );
};
export default App;
