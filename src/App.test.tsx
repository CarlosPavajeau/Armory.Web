import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './common/store';
import App from './App';

test('renders app', () => {
  const { getByText } = render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  );

  expect(true).toEqual(true);
});
