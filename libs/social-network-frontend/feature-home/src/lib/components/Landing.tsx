import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { OktaSignInWidget } from '@sn-htc/social-network-frontend/feature-auth';
import { oktaSignInConfig } from '@sn-htc/social-network-frontend/config-constants';
import './Landing.scss';

const Landing = () => {
  const { oktaAuth } = useOktaAuth();

  const onSuccess = async (tokens) => {
    await oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err) => {
    console.error('error logging in', err);
  };

  return (
    <div className='auth-landing' data-test='socivio-landing'>
      <div className='logo'>
        <h3>Socivio</h3>
        <p>Connect and share your moments with people</p>
      </div>
      <OktaSignInWidget
        config={oktaSignInConfig}
        onSuccess={onSuccess}
        onError={onError} />
    </div>
  );
};

export default Landing;
