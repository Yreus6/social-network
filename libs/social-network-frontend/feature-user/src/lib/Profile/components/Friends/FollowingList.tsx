import React, { useEffect, useState } from 'react';
import { MDBRow, MDBSpinner } from 'mdb-react-ui-kit';
import { useGetFollowingsForUserQuery, UserEdge } from '@sn-htc/social-network-frontend/data-access-user';
import produce from 'immer';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserCard from './UserCard';

interface FollowingListProps {
  currentUserId: string;
  userId: string;
  refetch: boolean;
  reset?: () => void;
}

const FollowingList = (props: FollowingListProps) => {
  const size = 20;
  const [cursor, setCursor] = useState<string | null>(null);
  const { data: followingsData, isLoading, isFetching, refetch } = useGetFollowingsForUserQuery({
    userId: props.userId,
    first: size,
    after: cursor
  });
  const [followings, setFollowings] = useState<UserEdge[]>([]);

  const fetchMoreData = (cursor: string) => {
    setCursor(cursor);
  };

  useEffect(() => {
    if (followingsData?.getFollowings && !isFetching) {
      setFollowings(
        produce(draft => {
          followingsData.getFollowings!.edges.forEach((userEdge) => {
            if (!draft.map(d => d.node.id).includes(userEdge.node.id)) {
              draft.push(userEdge);
            }
          });
        })
      );
    }
  }, [followingsData?.getFollowings, isFetching]);

  useEffect(() => {
    if (props.refetch && props.reset) {
      setFollowings([]);
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
      style={{ display: isFetching && followingsData?.getFollowings?.pageInfo.hasNextPage ? 'block' : 'none' }}
      className='mx-auto'
    />
  );

  return (
    followingsData?.getFollowings ?
    <InfiniteScroll
      style={{ overflow: 'hidden' }}
      dataLength={followingsData.getFollowings.edges.length}
      next={() => fetchMoreData(followingsData.getFollowings!.pageInfo.endCursor!)}
      hasMore={followingsData.getFollowings.pageInfo.hasNextPage!}
      loader={loader}
    >
      <MDBRow>
        {followings.map((userEdge, index) => (
          <UserCard
            key={index}
            currentUserId={props.currentUserId}
            userId={userEdge.node.id}
            displayName={`${userEdge.node.firstName} ${userEdge.node.lastName} ${userEdge.node.middleName ?? ''}`}
          />
        ))}
      </MDBRow>
    </InfiniteScroll> : <div />
  );
};

export default FollowingList;
