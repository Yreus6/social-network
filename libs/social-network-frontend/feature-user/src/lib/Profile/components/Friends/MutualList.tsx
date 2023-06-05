import React, { useEffect, useState } from 'react';
import { useGetMutualFriendsForUsersQuery, UserEdge } from '@sn-htc/social-network-frontend/data-access-user';
import produce from 'immer';
import { MDBRow, MDBSpinner } from 'mdb-react-ui-kit';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserCard from './UserCard';

interface MutualListProps {
  currentUserId: string;
  userId: string;
  refetch: boolean;
  reset?: () => void;
}

const MutualList = (props: MutualListProps) => {
  const size = 20;
  const [cursor, setCursor] = useState<string | null>(null);
  const { data: mutualFriendsData, isLoading, isFetching, refetch } = useGetMutualFriendsForUsersQuery({
    userId: props.currentUserId,
    otherId: props.userId,
    first: size,
    after: cursor
  });
  const [mutualFriends, setMutualFriends] = useState<UserEdge[]>([]);

  const fetchMoreData = (cursor: string) => {
    setCursor(cursor);
  };

  useEffect(() => {
    if (mutualFriendsData?.getMutualFriends && !isFetching) {
      setMutualFriends(
        produce(draft => {
          mutualFriendsData.getMutualFriends!.edges.forEach((userEdge) => {
            if (!draft.map(d => d.node.id).includes(userEdge.node.id)) {
              draft.push(userEdge);
            }
          });
        })
      );
    }
  }, [mutualFriendsData?.getMutualFriends, isFetching]);

  useEffect(() => {
    if (props.refetch && props.reset) {
      setMutualFriends([]);
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
      style={{ display: isFetching && mutualFriendsData?.getMutualFriends?.pageInfo.hasNextPage ? 'block' : 'none' }}
      className='mx-auto'
    />
  );

  return (
    mutualFriendsData?.getMutualFriends ?
      <InfiniteScroll
        style={{ overflow: 'hidden' }}
        dataLength={mutualFriendsData.getMutualFriends.edges.length}
        next={() => fetchMoreData(mutualFriendsData.getMutualFriends!.pageInfo.endCursor!)}
        hasMore={mutualFriendsData.getMutualFriends.pageInfo.hasNextPage!}
        loader={loader}
      >
        <MDBRow>
          {mutualFriends.map((userEdge, index) => (
            <UserCard
              key={index}
              currentUserId={props.userId}
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

export default MutualList;
