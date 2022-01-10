import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from '@sn-htc/social-network-frontend/components-routes';
import { AUTHORITIES } from '@sn-htc/social-network-frontend/config-constants';
import { Settings, Profile, Page, FriendRequests, Suggestions, SentRequests } from '@sn-htc/social-network-frontend/feature-user';
import { useGetUserFromOktaQuery } from '@sn-htc/social-network-frontend/data-access-user';
import { MDBSpinner } from 'mdb-react-ui-kit';
import { useOktaAuth } from '@okta/okta-react';

const PrivateRoutesContainer = () => {
  const { authState } = useOktaAuth();
  const { data, isLoading, error } = useGetUserFromOktaQuery();

  if (error && authState && authState.isAuthenticated) {
    return (
      <Page>
        <div className='d-flex justify-content-center align-items-center vh-100'>
          Oops! Something went wrong.
        </div>
      </Page>
    );
  }

  if (isLoading && authState && authState.isAuthenticated) {
    return (
      <Page>
        <div className='d-flex justify-content-center align-items-center vh-100'>
          <MDBSpinner role='status'>
            <span className='visually-hidden'>Loading...</span>
          </MDBSpinner>
        </div>
      </Page>
    );
  }

  return (
    <Switch>
      <PrivateRoute exact path='/settings' hasAnyAuthorities={[AUTHORITIES.USER]}>
        <Page>
          {data?.getCurrentUser ? <Settings user={data.getCurrentUser} /> : <div />}
        </Page>
      </PrivateRoute>
      <PrivateRoute exact path='/profile' hasAnyAuthorities={[AUTHORITIES.USER]}>
        <Page>
          {data?.getCurrentUser ? <Profile user={data.getCurrentUser} /> : <div />}
        </Page>
      </PrivateRoute>
      <PrivateRoute exact path='/friends/requests' hasAnyAuthorities={[AUTHORITIES.USER]}>
        <Page>
          {data?.getCurrentUser ? <FriendRequests user={data.getCurrentUser} /> : <div />}
        </Page>
      </PrivateRoute>
      <PrivateRoute exact path='/friends/sents' hasAnyAuthorities={[AUTHORITIES.USER]}>
        <Page>
          {data?.getCurrentUser ? <SentRequests user={data.getCurrentUser} /> : <div />}
        </Page>
      </PrivateRoute>
      <PrivateRoute exact path='/friends/suggestions' hasAnyAuthorities={[AUTHORITIES.USER]}>
        <Page>
          {data?.getCurrentUser ? <Suggestions user={data.getCurrentUser} /> : <div />}
        </Page>
      </PrivateRoute>
      <Route path='*' render={() => <h1>Not Found</h1>} />
    </Switch>
  );
};

export default PrivateRoutesContainer;
