import { FC, ReactElement } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { greetingApi } from '@sn-htc/social-network-frontend/data-access-home';
import { createMemoryHistory } from 'history';
import { oktaAuth } from './mocks/oktaAuth';
import { mockUser } from './mocks/mockUser';
import { Security } from '@okta/okta-react';
import { toRelativeUrl } from '@okta/okta-auth-js';

const history = createMemoryHistory();

const render = (
  ui: ReactElement,
  {
    store = configureStore({
      reducer: {
        [greetingApi.reducerPath]: greetingApi.reducer
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

const wrapper = (Elem: JSX.Element, authentication: { isAuthenticated: boolean }) => {
  const restoreOriginalUri = (_, originalUrl) => {
    history.replace(toRelativeUrl(originalUrl || '/', window.location.origin));
  };

  if (authentication.isAuthenticated) {
    oktaAuth.authStateManager.getAuthState = jest.fn(() => ({
      isAuthenticated: true
    }));
    oktaAuth.getUser = jest.fn(() => new Promise(resolve => {
      setTimeout(() => {
        resolve(mockUser);
      }, 100);
    }));
  } else {
    oktaAuth.authStateManager.getAuthState = jest.fn(() => ({
      isAuthenticated: false
    }));
  }

  return render(
    <Security
      oktaAuth={oktaAuth}
      restoreOriginalUri={restoreOriginalUri}
      onAuthRequired={() => history.push('/signin')}
    >
      {Elem}
    </Security>
  );
};

export * from '@testing-library/react';
export { render, history, wrapper };
