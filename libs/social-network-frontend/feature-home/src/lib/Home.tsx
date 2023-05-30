import React, { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { UserInfo } from '@sn-htc/social-network-frontend/components-routes';

export const Home = () => {
  const { oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    oktaAuth.getUser().then((user) => {
      setUserInfo(user as UserInfo);
    })
      .catch(err => {
        console.error(err);
      });
  }, [oktaAuth]);

  if (!userInfo) {
    return (
      <div>Loading user information...</div>
    );
  }

  return (
    <div>
      <div>
        <h1>Welcome {userInfo.name}</h1>
        <button onClick={() => oktaAuth.signOut()}>Logout</button>
      </div>
    </div>
  );
};
