import { ReactElement, useEffect } from 'react';

import { ConfigureGlobalError } from './common/config/http';
import { useAppDispatch, useAppSelector } from './common/hooks';
import Storage from './common/plugins/Storage';
import {
  closeErrorDialog,
  openErrorDialog,
  selectApiErrors,
} from './modules/application/Slice';
import { checkAuthentication } from './modules/users/Service';
import {
  authenticationStatus,
  selectIsAuthenticate,
  selectToken,
} from './modules/users/Slice';
import Router from './routes';
import ThemeConfig from './shared/theme';

const App = (): ReactElement => {
  const isAuthenticate = useAppSelector(selectIsAuthenticate);
  const token = useAppSelector(selectToken);
  const openErrDialog = useAppSelector(openErrorDialog);
  const apiErrors = useAppSelector(selectApiErrors);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticate) {
      if (!Storage.get('user_token')) {
        Storage.set('user_token', token);
      }
    }
  }, [isAuthenticate, token]);

  useEffect(() => {
    const result = checkAuthentication();
    dispatch(authenticationStatus(result));
  }, [dispatch]);

  useEffect(() => {
    ConfigureGlobalError(dispatch);
  }, [dispatch]);

  const handleOnCloseErrorDialog = () => {
    dispatch(closeErrorDialog());
  };

  return (
    <ThemeConfig>
      <Router />
    </ThemeConfig>
  );
};
export default App;
