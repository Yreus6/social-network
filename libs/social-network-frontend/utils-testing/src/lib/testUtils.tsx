import { FC, ReactElement } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { greetingApi } from '@sn-htc/social-network-frontend/data-access-home';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

const render = (
  ui: ReactElement,
  {
    store = configureStore({
      reducer: {
        [greetingApi.reducerPath]: greetingApi.reducer,
      },
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(greetingApi.middleware),
    }),
    ...renderOptions
  } = {}
) => {
  const Wrapper: FC = ({ children }) => {
    return (
      <Provider store={store}>
        <Router history={history}>
          {children}
        </Router>
      </Provider>
    );
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { render, history };
