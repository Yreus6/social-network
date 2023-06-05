import React, { useEffect, useState } from 'react';
import { MDBRow, MDBSpinner } from 'mdb-react-ui-kit';
import { useGetFriendsForUserQuery, UserEdge } from '@sn-htc/social-network-frontend/data-access-user';
import UserCard from './UserCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import produce from 'immer';

interface FriendListProps {
  currentUserId: string;
  userId: string;
  refetch: boolean;
  reset?: () => void;
}

const FriendList = (props: FriendListProps) => {
  const size = 20;
  const [cursor, setCursor] = useState<string | null>(null);
  const { data: friendsData, isLoading, isFetching, refetch } = useGetFriendsForUserQuery({
    userId: props.userId,
    first: size,
    after: cursor
  });
  const [friends, setFriends] = useState<UserEdge[]>([]);

  const fetchMoreData = (cursor: string) => {
    setCursor(cursor);
  };

  useEffect(() => {
    if (friendsData?.getFriends && !isFetching) {
      setFriends(
        produce(draft => {
          friendsData.getFriends!.edges.forEach((userEdge) => {
            if (!draft.map(d => d.node.id).includes(userEdge.node.id)) {
              draft.push(userEdge);
            }
          });
        })
      );
    }
  }, [friendsData?.getFriends, isFetching]);

  useEffect(() => {
    if (props.refetch && props.reset) {
      setFriends([]);
      refetch();
      props.reset();
    }
  }, [props.refetch, props.reset]);

  if (isLoading) {
    return (
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <MDBSpinner role='status'>
          <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
      </div>
    );
  }

  const loader = (
    <MDBSpinner
      tag='div'
      role='status'
      style={{ display: isFetching && friendsData?.getFriends?.pageInfo.hasNextPage ? 'block' : 'none' }}
      className='mx-auto'
    />
  );

  return (
    friendsData?.getFriends ?
    <InfiniteScroll
      style={{ overflow: 'hidden' }}
      dataLength={friendsData.getFriends.edges.length}
      next={() => fetchMoreData(friendsData.getFriends!.pageInfo.endCursor!)}
      hasMore={friendsData.getFriends.pageInfo.hasNextPage!}
      loader={loader}
    >
      <MDBRow>
        {friends.map((userEdge, index) => (
          <UserCard
            key={index}
            currentUserId={props.currentUserId}
            userId={userEdge.node.id}
            displayName={`${userEdge.node.firstName} ${userEdge.node.lastName} ${userEdge.node.middleName ?? ''}`}
            refetch={props.refetch}
            reset={props.reset}
          />
        ))}
      </MDBRow>
    </InfiniteScroll> : <div />
  );
};

export default FriendList;
