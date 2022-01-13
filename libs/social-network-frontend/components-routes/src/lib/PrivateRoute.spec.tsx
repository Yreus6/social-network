import '@testing-library/jest-dom';
import { screen, wrapper } from '@sn-htc/social-network-frontend/utils-testing';
import { hasAnyAuthority, PrivateRoute } from './PrivateRoute';
import { AUTHORITIES } from '@sn-htc/social-network-frontend/config-constants';
import { Route } from 'react-router-dom';

const TestComponent = () => {
  return (
    <h1>Test</h1>
  );
};

describe('Private Route', () => {
  describe('Authenticated', () => {
    it('should render component for authenticated user', async () => {
      wrapper(
        <PrivateRoute exact path='/'>
          <TestComponent />
        </PrivateRoute>,
        { isAuthenticated: true }
      );

      expect(await screen.findByRole('heading')).toHaveTextContent(/Test/);
    });

    it('should render error message when user has no authorities', async () => {
      wrapper(
        <PrivateRoute exact path='/' hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
          <TestComponent />
        </PrivateRoute>,
        { isAuthenticated: true }
      );

      expect(await screen.findByText(/You are not allowed to view this page/)).toBeInTheDocument();
    });
  });

  describe('Unauthenticated', () => {
    it('should redirect to Login page for unauthenticated user', async () => {
      let testLocation;

      wrapper(
        <>
          <PrivateRoute exact path='/'>
            <TestComponent />
          </PrivateRoute>
          <Route
            path='*'
            render={({ location }) => {
              testLocation = location;
              return null;
            }}
          />
        </>,
        { isAuthenticated: false }
      );

      expect(screen.queryByText(/Test/)).toBeNull();
      expect(testLocation.pathname).toEqual('/signin');
    });
  });
});

describe('hasAnyAuthority', () => {
  it('should return false when authorities is invalid', () => {
    expect(hasAnyAuthority(undefined, undefined)).toEqual(false);
    expect(hasAnyAuthority(null, [])).toEqual(false);
    expect(hasAnyAuthority([], [])).toEqual(false);
    expect(hasAnyAuthority([], [AUTHORITIES.USER])).toEqual(false);
  });

  it('should return true when authorities is valid and hasAnyAuthorities is empty', () => {
    expect(hasAnyAuthority([AUTHORITIES.USER], [])).toEqual(true);
  });

  it('should return true when authorities is valid and hasAnyAuthorities contains an authority', () => {
    expect(hasAnyAuthority([AUTHORITIES.USER], [AUTHORITIES.USER])).toEqual(true);
    expect(hasAnyAuthority([AUTHORITIES.USER, AUTHORITIES.ADMIN], [AUTHORITIES.USER])).toEqual(true);
    expect(hasAnyAuthority([AUTHORITIES.USER, AUTHORITIES.ADMIN], [AUTHORITIES.USER, AUTHORITIES.ADMIN])).toEqual(true);
    expect(hasAnyAuthority([AUTHORITIES.USER, AUTHORITIES.ADMIN], [AUTHORITIES.USER, 'ROLEADMIN'])).toEqual(true);
    expect(hasAnyAuthority([AUTHORITIES.USER, AUTHORITIES.ADMIN], [AUTHORITIES.ADMIN])).toEqual(true);
  });

  it('should return false when authorities is valid and hasAnyAuthorities does not contain an authority', () => {
    expect(hasAnyAuthority([AUTHORITIES.USER], [AUTHORITIES.ADMIN])).toEqual(false);
    expect(hasAnyAuthority([AUTHORITIES.USER, AUTHORITIES.ADMIN], ['ROLE_USERSS'])).toEqual(false);
    expect(hasAnyAuthority([AUTHORITIES.USER, AUTHORITIES.ADMIN], ['ROLEUSER', 'ROLEADMIN'])).toEqual(false);
  });
});
