import React, { MutableRefObject, useEffect, useRef } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import './OktaSignInWidget.module.scss';

const OktaSignInWidget = ({ config, onSuccess, onError }) => {
  const widgetRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (!widgetRef.current) {
      return;
    }

    const widget = new OktaSignIn(config);

    widget
      .showSignInToGetTokens({
        el: widgetRef.current,
      })
      .then(onSuccess)
      .catch(onError);

    return () => widget.remove();
  }, [config, onSuccess, onError]);

  return <div ref={widgetRef} />;
};

export default OktaSignInWidget;
