import React from 'react';
import { Redirect } from 'react-router-dom';
import OktaSignInWidget from './components/OktaSignInWidget';
import { useOktaAuth } from '@okta/okta-react';
import './Login.scss';

export const Login = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();

  const onSuccess = (tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err) => {
    console.error('error logging in', err);
  };

  if (!authState) {
    return null;
  }

  return authState.isAuthenticated ?
    <Redirect to={{ pathname: '/' }} /> :
    <div className='auth-login'>
      <OktaSignInWidget
        config={config}
        onSuccess={onSuccess}
        onError={onError} />
    </div>;
};
