import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '../../routes';

const MainLayout = (): React.ReactElement => {
  return (
    <>
      <Switch>
        {routes.map(prop => {
          return (
            <Route
              key={`${prop.path}`}
              path={prop.path}
              component={prop.component}
              exact={prop.exact}
            />
          );
        })}
        <Route path="/" render={() => <Redirect to="/login" />} />
      </Switch>
    </>
  );
};

export default MainLayout;
