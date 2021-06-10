import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import routes from './routes';
import GlobalStyles from './components/GlobalStyles';

const App = (): React.ReactElement => {
  return (
    <div className="App">
      <GlobalStyles />
      <Switch>
        {routes.map(prop => {
          return (
            <Route
              path={prop.path}
              component={prop.component}
              exact={prop.exact}
            />
          );
        })}
      </Switch>
    </div>
  );
};
export default App;
