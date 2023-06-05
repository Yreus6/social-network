import React, { useEffect } from 'react';
import { FriendCard } from '@sn-htc/social-network-frontend/ui-cards';
import { MDBCol } from 'mdb-react-ui-kit';
import { useCountMutualFriendsForUsersQuery } from '@sn-htc/social-network-frontend/data-access-user';
import { useHistory } from 'react-router-dom';

interface UserCardProps {
  currentUserId: string;
  userId: string;
  displayName: string;
  refetch?: boolean;
  reset?: () => void;
}

const UserCard = (props: UserCardProps) => {
  const history = useHistory();
  const { data: countMutualFriendsData, refetch } = useCountMutualFriendsForUsersQuery({
    userId: props.currentUserId,
    otherId: props.userId
  });

  useEffect(() => {
    if (props.refetch && props.reset) {
      refetch();
      props.reset();
    }
  }, [props.refetch, props.reset]);

  return (
    <MDBCol md='6' className='mb-4'>
      <FriendCard
        onClickUser={() => history.push(`/profile?userId=${props.userId}`)}
        displayName={props.displayName}
        showMutual={props.currentUserId !== props.userId}
        countMutualFriends={countMutualFriendsData?.countMutualFriends ?? 0}
      />
    </MDBCol>
  );
};

export default UserCard;
