import React, { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { UserInfo } from '@sn-htc/social-network-frontend/components-routes';
import Landing from './components/Landing';

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
    <div>
      {!authState.isAuthenticated && <Landing />}
      {authState.isAuthenticated && !userInfo
        && <div>Loading user information...</div>
      }
      {authState.isAuthenticated && userInfo && (
        <div>
          <h1>Welcome {userInfo.name}</h1>
          <button data-test='logout-btn' onClick={() => oktaAuth.signOut()}>Logout</button>
        </div>
      )}
    </div>
  );
};
