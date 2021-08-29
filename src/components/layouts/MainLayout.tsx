import Location from 'components/routes/Location';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const MainLayout = (): React.ReactElement => {
  return (
    <>
      <Switch>
        <Location />
        <Route path="/" render={() => <Redirect to="/login" />} />
      </Switch>
    </>
  );
};

export default MainLayout;
