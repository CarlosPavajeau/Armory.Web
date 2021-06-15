import React, { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './common/hooks';
import MainLayout from './components/layouts/MainLayout';
import DashboardLayout from './components/layouts/DashboardLayout';
import { checkAuthentication } from './modules/users/services/AuthorizationService';
import { selectIsAuthenticate, selectToken } from './modules/users/userSlice';

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
    <div className="App">
      <GlobalStyles />
      {isAuthenticate ? <DashboardLayout /> : <MainLayout />}
    </div>
  );
};
export default App;
