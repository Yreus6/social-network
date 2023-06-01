import React, { MutableRefObject, useEffect, useRef } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { useHistory } from 'react-router-dom';

const OktaSignInWidget = ({ config, onSuccess, onError }) => {
  const history = useHistory();
  const widgetRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (!widgetRef.current) {
      return;
    }

    const widget = new OktaSignIn(config);

    widget
      .showSignInToGetTokens({
        el: widgetRef.current
      })
      .then(onSuccess)
      .catch(onError);

    widget.on('afterRender', (context) => {
      if (context.controller === 'primary-auth') {
        return;
      }

      const backLink = widgetRef.current.querySelector('.auth-footer .link');
      backLink?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        history.push('/signin');
      });
    });

    widget.on('afterError', (context, error) => {
      console.log(error.message);
    });

    return () => widget.remove();
  }, [config, onSuccess, onError, history]);

  return (
    <div ref={widgetRef} />
  );
};

export default OktaSignInWidget;
