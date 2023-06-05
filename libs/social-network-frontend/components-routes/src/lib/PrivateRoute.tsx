import React, { useEffect, useState } from 'react';
import { RouteProps } from 'react-router-dom';
import { UserClaims } from '@okta/okta-auth-js';
import { SecureRoute, useOktaAuth } from '@okta/okta-react';
import { MDBSpinner } from 'mdb-react-ui-kit';

interface PrivateRouteProps extends RouteProps {
  hasAnyAuthorities?: string[];
}

export interface UserInfo extends UserClaims {
  groups: string[];
}

export const PrivateRoute = ({ hasAnyAuthorities = [], children, ...rest }: PrivateRouteProps) => {
  const { authState } = useOktaAuth();
  const [authorities, setAuthorities] = useState<string[] | null>(null);

  useEffect(() => {
    if (authState && authState.isAuthenticated && authState.idToken) {
      const userAuthorities = (authState.idToken.claims as UserInfo).groups.filter(group => group.startsWith('ROLE_'));
      setAuthorities(userAuthorities);
    }

    return () => {
      setAuthorities(null);
    };
  }, [authState]);

  return (
    <SecureRoute
      {...rest}
      render={() => {
        if (!authorities) {
          return (
            <div className='d-flex justify-content-center align-items-center vh-100'>
              <MDBSpinner role='status'>
                <span className='visually-hidden'>Loading...</span>
              </MDBSpinner>
            </div>
          );
        } else {
          return hasAnyAuthority(authorities, hasAnyAuthorities) ? children :
            <div data-test='text-forbidden'>You are not allowed to view this page</div>;
        }
      }}
    />
  );
};

export const hasAnyAuthority = (authorities: string[] | null | undefined, hasAnyAuthorities: string[] | undefined) => {
  if (authorities && authorities.length !== 0) {
    if (hasAnyAuthorities?.length === 0) {
      return true;
    }
    return hasAnyAuthorities?.some(auth => authorities.includes(auth));
  }
  return false;
};
