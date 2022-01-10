import React, { useState } from 'react';
import {
  MDBCard,
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import './Friends.scss';
import FriendList from './FriendList';
import FollowingList from './FollowingList';
import FollowerList from './FollowerList';
import MutualList from './MutualList';
import { useLocation } from 'react-router-dom';

interface FriendsProps {
  currentUserId: string;
  userId: string;
  refetchFriends: boolean;
  reset?: () => void;
}

const Friends = (props: FriendsProps) => {
  const location = useLocation();
  const [tabActive, setTabActive] = useState('all');

  const handleTabsClick = (value: string) => {
    if (value === tabActive) {
      return;
    }

    setTabActive(value);
  };

  return (
    <MDBCard className='friends pt-3 pe-5 pb-4 ps-4'>
      <h5>Friends</h5>
      <MDBTabs className='mb-3'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleTabsClick('all')} active={tabActive === 'all'}>
            All Friends
          </MDBTabsLink>
        </MDBTabsItem>
        {props.currentUserId !== props.userId &&
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleTabsClick('mutual')} active={tabActive === 'mutual'}>
            Mutual Friends
          </MDBTabsLink>
        </MDBTabsItem>
        }
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleTabsClick('followings')} active={tabActive === 'followings'}>
            Followings
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleTabsClick('followers')} active={tabActive === 'followers'}>
            Followers
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={tabActive === 'all'}>
          <FriendList
            key={location.key}
            currentUserId={props.currentUserId}
            userId={props.userId}
            refetch={props.refetchFriends}
            reset={props.reset}
          />
        </MDBTabsPane>
        {props.currentUserId !== props.userId &&
        <MDBTabsPane show={tabActive === 'mutual'}>
          <MutualList
            key={location.key}
            currentUserId={props.currentUserId}
            userId={props.userId}
            refetch={props.refetchFriends}
            reset={props.reset}
          />
        </MDBTabsPane>
        }
        <MDBTabsPane show={tabActive === 'followings'}>
          <FollowingList
            key={location.key}
            currentUserId={props.currentUserId}
            userId={props.userId}
            refetch={props.refetchFriends}
            reset={props.reset}
          />
        </MDBTabsPane>
        <MDBTabsPane show={tabActive === 'followers'}>
          <FollowerList
            key={location.key}
            currentUserId={props.currentUserId}
            userId={props.userId}
            refetch={props.refetchFriends}
            reset={props.reset}
          />
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBCard>
  );
};

export default Friends;
