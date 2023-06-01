import '@testing-library/jest-dom';
import { wrapper, screen } from '@sn-htc/social-network-frontend/utils-testing';
import { Route } from 'react-router-dom';
import { Home } from './Home';

describe('Home Page', () => {
  it('should display landing page for unauthenticated user', async () => {
    wrapper(
      <Route path='/' exact component={Home} />,
      { isAuthenticated: false }
    );

    expect(await screen.findByRole('heading')).toHaveTextContent(/Landing Page/);
  });

  it('should display welcome message for authenticated user', async () => {
    wrapper(
      <Route path='/' exact component={Home} />,
      { isAuthenticated: true }
    );

    expect(await screen.findByRole('heading')).toHaveTextContent(/Welcome/);
    expect(await screen.findByTestId('logout-btn')).toHaveTextContent(/Logout/);
  });
});
