import React, { useEffect, useState } from 'react';
import { MDBRow, MDBSpinner } from 'mdb-react-ui-kit';
import { useGetFriendRequestsForUserQuery, User, UserEdge } from '@sn-htc/social-network-frontend/data-access-user';
import UserRequestCard from './UserRequestCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import produce from 'immer';

interface FriendRequestsProps {
  user: User;
  refetch?: boolean;
}

const FriendRequests = (props: FriendRequestsProps) => {
  const size = 12;
  const [cursor, setCursor] = useState<string | null>(null);
  const { data: requestsData, isLoading, isFetching, refetch } = useGetFriendRequestsForUserQuery({
    userId: props.user.id,
    first: size,
    after: cursor
  });
  const [requests, setRequests] = useState<UserEdge[]>([]);

  const fetchMoreData = (cursor: string) => {
    setCursor(cursor);
  };

  useEffect(() => {
    if (requestsData?.getFriendRequests && !isFetching) {
      setRequests(
        produce(draft => {
          requestsData.getFriendRequests!.edges.forEach((userEdge) => {
            if (!draft.map(d => d.node.id).includes(userEdge.node.id)) {
              draft.push(userEdge);
            }
          });
        })
      );
    }
  }, [requestsData?.getFriendRequests, isFetching]);

  useEffect(() => {
    if (props.refetch) {
      setRequests([]);
      refetch();
    }
  }, [props.refetch]);

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
      style={{ display: isFetching && requestsData?.getFriendRequests?.pageInfo.hasNextPage ? 'block' : 'none' }}
      className='mx-auto'
    />
  );

  return (
    <div className='card-friend pb-2 ps-3 pe-3 d-flex flex-column'>
      <h5 className='mt-4 ms-2 mb-3'>Friend Requests</h5>
      {requestsData?.getFriendRequests ?
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          next={() => fetchMoreData(requestsData.getFriendRequests!.pageInfo.endCursor!)}
          hasMore={requestsData.getFriendRequests.pageInfo.hasNextPage!}
          loader={loader}
          dataLength={requestsData.getFriendRequests.edges.length}
        >
          <MDBRow>
            {requests.length === 0 &&
              <div
                className='d-flex justify-content-center align-items-center'
                style={{ minHeight: '200px' }}
              >It's empty here</div>
            }

            {requests.map((userEdge, index) => (
              <UserRequestCard
                key={index}
                currentUserId={props.user.id}
                userId={userEdge.node.id}
                displayName={`${userEdge.node.firstName} ${userEdge.node.lastName} ${userEdge.node.middleName ?? ''}`}
              />
            ))}
          </MDBRow>
        </InfiniteScroll> : <div />
      }
    </div>
  );
};

export default FriendRequests;
