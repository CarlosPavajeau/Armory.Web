import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { ConfigureGlobalError } from './common/config/http';
import { useAppDispatch, useAppSelector } from './common/hooks';
import Storage from './common/plugins/Storage';
import ErrorDialog from './components/feedback/dialogs/ErrorDialog';
import GlobalStyles from './components/GlobalStyles';
import DashboardLayout from './components/layouts/DashboardLayout';
import MainLayout from './components/layouts/MainLayout';
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

const App = (): React.ReactElement => {
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
    <div>
      <GlobalStyles />
      <Switch>
        <Route path="/dashboard" component={DashboardLayout} />
        <Route path="/" component={MainLayout} />
      </Switch>
      <ErrorDialog
        open={openErrDialog}
        errors={apiErrors}
        onClose={handleOnCloseErrorDialog}
      />
    </div>
  );
};
export default App;
