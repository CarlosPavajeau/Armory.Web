import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './common/hooks';
import MainLayout from './components/layouts/MainLayout';
import DashboardLayout from './components/layouts/DashboardLayout';
import { checkAuthentication } from './modules/users/Service';
import { selectIsAuthenticate, selectToken } from './modules/users/Slice';

import GlobalStyles from './components/GlobalStyles';

const App = (): React.ReactElement => {
  const isAuthenticate = useAppSelector(selectIsAuthenticate);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticate) {
      if (!window.localStorage.getItem('user_token')) {
        window.localStorage.setItem('user_token', token);
      }
    }
  }, [isAuthenticate, token]);

  useEffect(() => {
    checkAuthentication(dispatch);
  }, [dispatch]);

  return (
    <div>
      <GlobalStyles />
      <Switch>
        <Route path="/dashboard" component={DashboardLayout} />
        <Route path="/" component={MainLayout} />
      </Switch>
    </div>
  );
};
export default App;
