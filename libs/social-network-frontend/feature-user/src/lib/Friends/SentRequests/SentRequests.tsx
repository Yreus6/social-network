import React, { useEffect, useState } from 'react';
import { useGetSentRequestsForUserQuery, User, UserEdge } from '@sn-htc/social-network-frontend/data-access-user';
import produce from 'immer';
import { MDBRow, MDBSpinner } from 'mdb-react-ui-kit';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserSentCard from './UserSentCard';

interface SentRequestsProps {
  user: User;
  refetch?: boolean;
}

const SentRequests = (props: SentRequestsProps) => {
  const size = 12;
  const [cursor, setCursor] = useState<string | null>(null);
  const { data: sentRequestsData, isLoading, isFetching, refetch } = useGetSentRequestsForUserQuery({
    userId: props.user.id,
    first: size,
    after: cursor
  });
  const [sentRequests, setSentRequests] = useState<UserEdge[]>([]);

  const fetchMoreData = (cursor: string) => {
    setCursor(cursor);
  };

  useEffect(() => {
    if (sentRequestsData?.getSentRequests && !isFetching) {
      setSentRequests(
        produce(draft => {
          sentRequestsData.getSentRequests!.edges.forEach((userEdge) => {
            if (!draft.map(d => d.node.id).includes(userEdge.node.id)) {
              draft.push(userEdge);
            }
          });
        })
      );
    }
  }, [sentRequestsData?.getSentRequests, isFetching]);

  useEffect(() => {
    if (props.refetch) {
      setSentRequests([]);
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
      style={{ display: isFetching && sentRequestsData?.getSentRequests?.pageInfo.hasNextPage ? 'block' : 'none' }}
      className='mx-auto'
    />
  );

  return (
    <div className='card-friend pb-2 ps-3 pe-3 d-flex flex-column'>
      <h5 className='mt-4 ms-2 mb-3'>Sent Requests</h5>
      {sentRequestsData?.getSentRequests ?
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          next={() => fetchMoreData(sentRequestsData.getSentRequests!.pageInfo.endCursor!)}
          hasMore={sentRequestsData.getSentRequests.pageInfo.hasNextPage!}
          loader={loader}
          dataLength={sentRequestsData.getSentRequests.edges.length}
        >
          <MDBRow>
            {sentRequests.length === 0 &&
              <div
                className='d-flex justify-content-center align-items-center'
                style={{ minHeight: '200px' }}
              >It's empty here</div>
            }

            {sentRequests.map((userEdge, index) => (
              <UserSentCard
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

export default SentRequests;
