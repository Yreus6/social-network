import React, { useState } from 'react';
import { MDBCol, MDBRow, MDBTabs, MDBTabsContent, MDBTabsItem, MDBTabsLink, MDBTabsPane } from 'mdb-react-ui-kit';
import './Friends.scss';
import { User } from '@sn-htc/social-network-frontend/data-access-user';
import FriendRequests from './FriendRequests/FriendRequests';
import SentRequests from './SentRequests/SentRequests';
import Suggestions from './FriendSuggestions/Suggestions';
import { useLocation } from 'react-router-dom';

interface FriendsLocationState {
  refresh?: boolean;
}

interface FriendsProps {
  user: User;
}

export const Friends = (props: FriendsProps) => {
  const location = useLocation<FriendsLocationState>();
  const [basicActive, setBasicActive] = useState<string>('requests');

  const handleBasicClick = (value: string) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

  return (
    <div className='friend-page'>
      <MDBRow style={{ height: '1rem', width: '100%' }} />
      <MDBRow className='m-0'>
        <MDBCol md='1' xl='1' sm='0' />
        <MDBCol md='10' xl='10' sm='12' className='mt-0'>
          <div className='card-friend pb-2 ps-3 pe-3 d-flex flex-column pt-2'>
            <MDBTabs className='mb-4'>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleBasicClick('requests')}
                  active={basicActive === 'requests'}
                  className='h1'
                >
                  <span className='h6 text-capitalize'>Friend Requests</span>
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  data-test='sents-link'
                  onClick={() => handleBasicClick('sents')}
                  active={basicActive === 'sents'}
                  className='h1'
                >
                  <span className='h6 text-capitalize'>Sent Requests</span>
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleBasicClick('suggestions')}
                  active={basicActive === 'suggestions'}
                >
                  <span className='h6 text-capitalize'>Friend Suggestions</span>
                </MDBTabsLink>
              </MDBTabsItem>
            </MDBTabs>
            <MDBTabsContent>
              <MDBTabsPane
                show={basicActive === 'requests'}
              >
                <FriendRequests
                  key={location.key}
                  user={props.user}
                  refetch={location.state?.refresh}
                />
              </MDBTabsPane>
              <MDBTabsPane
                show={basicActive === 'sents'}
              >
                <SentRequests
                  key={location.key}
                  user={props.user}
                  refetch={location.state?.refresh}
                />
              </MDBTabsPane>
              <MDBTabsPane
                show={basicActive === 'suggestions'}
              >
                <Suggestions
                  key={location.key}
                  user={props.user}
                  refetch={location.state?.refresh}
                />
              </MDBTabsPane>
            </MDBTabsContent>
          </div>
        </MDBCol>
        <MDBCol md='1' xl='1' sm='0' />
      </MDBRow>
    </div>
  );
};
