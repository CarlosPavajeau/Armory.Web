import React from 'react';
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';

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
              key={`${prop.path}`}
              path={prop.path}
              component={prop.component}
              exact={prop.exact}
            />
          );
        })}
        <Route path="/" render={() => <Redirect to="/login" />} />
      </Switch>
    </div>
  );
};
export default App;
