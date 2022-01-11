import React, { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { UserInfo } from '@sn-htc/social-network-frontend/components-routes';
import Landing from './components/Landing';
import { Page } from '@sn-htc/social-network-frontend/feature-user';

export const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((user) => {
        setUserInfo(user as UserInfo);
      })
        .catch(err => {
          console.error(err);
        });
    }
  }, [authState, oktaAuth]);

  if (!authState) {
    return <div>Loading...</div>;
  }

  return (
    <Page>
      {!authState.isAuthenticated && <Landing />}
      {authState.isAuthenticated && !userInfo
        && <div>Loading user information...</div>
      }
      {authState.isAuthenticated && userInfo && (
        <div className='d-flex justify-content-center align-items-center'>
          <h1 className='me-2'>Welcome {userInfo.name}</h1>
          <button data-test='logout-btn' onClick={() => oktaAuth.signOut()}>Logout</button>
        </div>
      )}
    </Page>
  );
};
