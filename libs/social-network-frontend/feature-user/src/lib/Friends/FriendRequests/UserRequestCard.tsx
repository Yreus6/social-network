import React, { useEffect, useState } from 'react';
import { RequestCard } from '@sn-htc/social-network-frontend/ui-cards';
import { useHistory } from 'react-router-dom';
import {
  useConfirmFriendRequestForUserMutation,
  useCountMutualFriendsForUsersQuery, useDeclineFriendRequestForUserMutation
} from '@sn-htc/social-network-frontend/data-access-user';
import { MDBToast } from 'mdb-react-ui-kit';

interface UserRequestCardProps {
  currentUserId: string;
  userId: string;
  displayName: string;
}

const UserRequestCard = (props: UserRequestCardProps) => {
  const history = useHistory();
  const { data: countMutualFriendsData } = useCountMutualFriendsForUsersQuery({
    userId: props.currentUserId,
    otherId: props.userId
  });
  const [confirmFriendRequest, { isLoading: isConfirmRequestUpdating }] = useConfirmFriendRequestForUserMutation();
  const [declineFriendRequest, { isLoading: isDeclineRequestUpdating }] = useDeclineFriendRequestForUserMutation();
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);

  const acceptRequest = async () => {
    try {
      await confirmFriendRequest({
        userId: props.currentUserId,
        targetId: props.userId
      }).unwrap();
    } catch {
      setShowErrorToast(true);
    }
  };

  const removeRequest = async () => {
    try {
      await declineFriendRequest({
        userId: props.currentUserId,
        targetId: props.userId
      }).unwrap();
    } catch {
      setShowErrorToast(true);
    }
  };

  useEffect(() => {
    if (showErrorToast) {
      setTimeout(() => {
        setShowErrorToast(false);
      });
    }
  }, [showErrorToast]);

  return (
    <>
      <RequestCard
        onClickUser={() => history.push(`/profile?userId=${props.userId}`)}
        userId={props.userId}
        displayName={props.displayName}
        countMutualFriends={countMutualFriendsData?.countMutualFriends ?? 0}
        onAcceptRequest={acceptRequest}
        onRemoveRequest={removeRequest}
        isAccepting={isConfirmRequestUpdating}
        isRemoving={isDeclineRequestUpdating}
      />
      <MDBToast
        color='danger'
        show={showErrorToast}
        autohide
        position='top-right'
        delay={3000}
        appendToBody
        headerContent={
          <>
            <strong className='me-auto'>Error!</strong>
          </>
        }
        bodyContent='An error occurred. Please retry.'
      />
    </>
  );
};

export default UserRequestCard;
