import { ReactElement } from 'react';
import { Route } from 'react-router-dom';

import Paths from '../../routes';

const Routes = (): ReactElement => {
  return (
    <>
      {(Paths || []).map(item => (
        <Route
          key={`${item.component}-${item.path}`}
          exact={item.exact}
          path={item.path}
          component={item.component}
        />
      ))}
    </>
  );
};

export default Routes;
