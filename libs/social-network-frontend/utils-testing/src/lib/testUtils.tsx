import { FC, ReactElement } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { oktaAuth } from './mocks/oktaAuth';
import { mockUser } from './mocks/mockUser';
import { Security } from '@okta/okta-react';
import { toRelativeUrl } from '@okta/okta-auth-js';
import { api as userProfileApi } from '@sn-htc/social-network-frontend/data-access-user';

const history = createMemoryHistory();

const rootReducer = combineReducers({
  [userProfileApi.reducerPath]: userProfileApi.reducer,
});

const render = (
  ui: ReactElement,
  {
    store = configureStore({
      reducer: rootReducer,
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(userProfileApi.middleware)
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
    history.go(0);
  };

  if (authentication.isAuthenticated) {
    oktaAuth.authStateManager.getAuthState = jest.fn(() => ({
      isAuthenticated: true,
      idToken: {
        idToken: 'test',
        claims: mockUser,
        issuer: 'test',
        clientId: 'test',
        expiresAt: 0,
        authorizeUrl: 'test',
        scopes: []
      }
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
