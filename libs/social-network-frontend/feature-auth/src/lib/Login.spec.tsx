import '@testing-library/jest-dom';
import { wrapper, screen, oktaAuth } from '@sn-htc/social-network-frontend/utils-testing';
import { Login } from './Login';
import { oktaSignInConfig } from '@sn-htc/social-network-frontend/config-constants';
import { Route } from 'react-router-dom';
import { waitFor } from '@testing-library/react';

describe('Login Page', () => {
  it('should redirect to home page after login', async () => {
    let testLocation;

    wrapper(
      <>
        <Route exact path='/signin' render={() => <Login config={oktaSignInConfig} />} />,
        <Route
          path='*'
          render={({ location }) => {
            testLocation = location;
            return null;
          }}
        />
      </>,
      { isAuthenticated: true }
    );

    await waitFor(() => expect(oktaAuth.authStateManager.getAuthState).toBeCalled());
    expect(testLocation.pathname).toEqual('/');
  });

  it('should render signin widget for unauthenticated user', async () => {
    wrapper(
      <Route exact path='/' render={() => <Login config={oktaSignInConfig} />} />,
      { isAuthenticated: false }
    );

    await waitFor(() => expect(oktaAuth.authStateManager.getAuthState).toBeCalled());
    expect(screen.getByTestId('okta-auth')).toBeInTheDocument();
  });
});
