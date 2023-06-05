import React, { useEffect, useState } from 'react';
import { SuggestCard } from '@sn-htc/social-network-frontend/ui-cards';
import { useHistory } from 'react-router-dom';
import {
  useCheckRequestFriendUserQuery,
  useCountMutualFriendsForUsersQuery,
  useSendFriendRequestForUserMutation
} from '@sn-htc/social-network-frontend/data-access-user';
import { MDBToast } from 'mdb-react-ui-kit';

interface UserSuggestCardProps {
  currentUserId: string;
  userId: string;
  displayName: string;
  onRemoveSuggest?: () => void;
}

const UserSuggestCard = (props: UserSuggestCardProps) => {
  const history = useHistory();
  const { data: countMutualFriendsData } = useCountMutualFriendsForUsersQuery({
    userId: props.currentUserId,
    otherId: props.userId
  });
  const { data: checkRequestFriendData } = useCheckRequestFriendUserQuery({
    userId: props.currentUserId,
    otherId: props.userId
  });
  const [sendFriendRequest, { isLoading: isAddFriendUpdating }] = useSendFriendRequestForUserMutation();
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);

  const addFriend = async () => {
    try {
      await sendFriendRequest({
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
      <SuggestCard
        onClickUser={() => history.push(`/profile?userId=${props.userId}`)}
        userId={props.userId}
        displayName={props.displayName}
        countMutualFriends={countMutualFriendsData?.countMutualFriends ?? 0}
        onAddFriend={addFriend}
        onRemoveSuggest={props.onRemoveSuggest}
        isAdding={isAddFriendUpdating}
        isRequestSent={checkRequestFriendData?.checkRequestFriend}
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

export default UserSuggestCard;
