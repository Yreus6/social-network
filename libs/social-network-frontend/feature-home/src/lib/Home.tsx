import React, { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { UserInfo } from '@sn-htc/social-network-frontend/components-routes';
import Landing from './components/Landing';
import { Page } from '@sn-htc/social-network-frontend/feature-user';

export const Home = () => {
  const { authState } = useOktaAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      setUserInfo(null);
    } else {
      if (authState.idToken) {
        setUserInfo(authState.idToken.claims as UserInfo);
      }
    }
  }, [authState]);

  if (!authState) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!authState.isAuthenticated && <Landing />}
      {authState.isAuthenticated && !userInfo &&
        <Page>
          <div>Loading user information...</div>
        </Page>
      }
      {authState.isAuthenticated && userInfo &&
        <Page>
          <div className='d-flex justify-content-center align-items-center'>
            <h1 className='me-2'>Welcome {userInfo.name}</h1>
          </div>
        </Page>
      }
    </>
  );
};
