import React, { useEffect, useState } from 'react';
import { MDBRow, MDBSpinner } from 'mdb-react-ui-kit';
import { useGetFollowersForUserQuery, UserEdge } from '@sn-htc/social-network-frontend/data-access-user';
import produce from 'immer';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserCard from './UserCard';

interface FollowerListProps {
  currentUserId: string;
  userId: string;
  refetch: boolean;
  reset?: () => void;
}

const FollowerList = (props: FollowerListProps) => {
  const size = 20;
  const [cursor, setCursor] = useState<string | null>(null);
  const { data: followersData, isLoading, isFetching, refetch } = useGetFollowersForUserQuery({
    userId: props.userId,
    first: size,
    after: cursor
  });
  const [followers, setFollowers] = useState<UserEdge[]>([]);

  const fetchMoreData = (cursor: string) => {
    setCursor(cursor);
  };

  useEffect(() => {
    if (followersData?.getFollowers && !isFetching) {
      setFollowers(
        produce(draft => {
          followersData.getFollowers!.edges.forEach((userEdge) => {
            if (!draft.map(d => d.node.id).includes(userEdge.node.id)) {
              draft.push(userEdge);
            }
          });
        })
      );
    }
  }, [followersData?.getFollowers, isFetching]);

  useEffect(() => {
    if (props.refetch && props.reset) {
      setFollowers([]);
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
      style={{ display: isFetching && followersData?.getFollowers?.pageInfo.hasNextPage ? 'block' : 'none' }}
      className='mx-auto'
    />
  );

  return (
    followersData?.getFollowers ?
    <InfiniteScroll
      style={{ overflow: 'hidden' }}
      dataLength={followersData.getFollowers.edges.length}
      next={() => fetchMoreData(followersData.getFollowers!.pageInfo.endCursor!)}
      hasMore={followersData.getFollowers.pageInfo.hasNextPage!}
      loader={loader}
    >
      <MDBRow>
        {followers.map((userEdge, index) => (
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

export default FollowerList;
