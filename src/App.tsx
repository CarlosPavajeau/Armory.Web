import { ConfigureGlobalError } from 'common/config/http';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import Storage from 'common/plugins/Storage';
import { selectIsAuth, selectPayload } from 'modules/auth/Slice';
import { getPersonByUserId } from 'modules/people/Service';
import { setCurrentPerson } from 'modules/people/Slice';
import { ReactElement, useEffect } from 'react';

import Router from './routes';
import ThemeConfig from './shared/theme';

const App = (): ReactElement => {
  const payload = useAppSelector(selectPayload);
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (payload.isAuthenticate && payload.token) {
      Storage.set('user_token', payload.token);

      (async () => {
        if (payload.token !== undefined) {
          const { nameid } = Storage.decode(payload.token);
          const person = await getPersonByUserId(nameid);
          Storage.set('current_person', JSON.stringify(person));

          dispatch(setCurrentPerson(person));
        }
      })();
    } else {
      Storage.remove('user_token');
    }
  }, [payload, dispatch]);

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
