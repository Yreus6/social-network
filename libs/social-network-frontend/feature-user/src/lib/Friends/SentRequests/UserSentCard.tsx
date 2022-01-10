import React, { useEffect, useState } from 'react';
import { SentCard } from '@sn-htc/social-network-frontend/ui-cards';
import { useHistory } from 'react-router-dom';
import {
  useCancelSentRequestForUserMutation,
  useCountMutualFriendsForUsersQuery
} from '@sn-htc/social-network-frontend/data-access-user';
import { MDBToast } from 'mdb-react-ui-kit';

interface UserSentCardProps {
  currentUserId: string;
  userId: string;
  displayName: string;
}

const UserSentCard = (props: UserSentCardProps) => {
  const history = useHistory();
  const { data: countMutualFriendsData } = useCountMutualFriendsForUsersQuery({
    userId: props.currentUserId,
    otherId: props.userId
  });
  const [cancelSentRequest, { isLoading: isCancelUpdating }] = useCancelSentRequestForUserMutation();
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);

  const cancelRequest = async () => {
    try {
      await cancelSentRequest({
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
      <SentCard
        onClickUser={() => history.push(`/profile?userId=${props.userId}`)}
        userId={props.userId}
        displayName={props.displayName}
        countMutualFriends={countMutualFriendsData?.countMutualFriends ?? 0}
        onCancelRequest={cancelRequest}
        isCancelling={isCancelUpdating}
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

export default UserSentCard;
