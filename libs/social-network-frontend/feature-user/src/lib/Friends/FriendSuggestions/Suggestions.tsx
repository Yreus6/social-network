import React, { useEffect, useState } from 'react';
import { MDBRow, MDBSpinner } from 'mdb-react-ui-kit';
import UserSuggestCard from './UserSuggestCard';
import { useGetFriendSuggestionsForUserQuery, User, UserEdge } from '@sn-htc/social-network-frontend/data-access-user';
import produce from 'immer';
import InfiniteScroll from 'react-infinite-scroll-component';

interface SuggestionsProps {
  user: User;
  refetch?: boolean;
}

const Suggestions = (props: SuggestionsProps) => {
  const size = 12;
  const [cursor, setCursor] = useState<string | null>(null);
  const { data: suggestionsData, isLoading, isFetching, refetch } = useGetFriendSuggestionsForUserQuery({
    userId: props.user.id,
    first: size,
    after: cursor
  });
  const [suggestions, setSuggestions] = useState<UserEdge[]>([]);

  const fetchMoreData = (cursor: string) => {
    setCursor(cursor);
  };

  const removeSuggest = (userId: string) => {
    setSuggestions(suggestions.filter((userEdge) => userEdge.node.id !== userId));
  };

  useEffect(() => {
    if (suggestionsData?.getFriendSuggestions && !isFetching) {
      setSuggestions(
        produce(draft => {
          suggestionsData.getFriendSuggestions!.edges.forEach((userEdge) => {
            if (!draft.map(d => d.node.id).includes(userEdge.node.id)) {
              draft.push(userEdge);
            }
          });
        })
      );
    }
  }, [suggestionsData?.getFriendSuggestions, isFetching]);

  useEffect(() => {
    if (props.refetch) {
      setSuggestions([]);
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
      style={{ display: isFetching && suggestionsData?.getFriendSuggestions?.pageInfo.hasNextPage ? 'block' : 'none' }}
      className='mx-auto'
    />
  );

  return (
    <div className='card-friend pb-2 ps-3 pe-3 d-flex flex-column'>
      <h5 className='mt-4 ms-2 mb-3'>People you may know</h5>
      {suggestionsData?.getFriendSuggestions ?
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          next={() => fetchMoreData(suggestionsData.getFriendSuggestions!.pageInfo.endCursor!)}
          hasMore={suggestionsData.getFriendSuggestions.pageInfo.hasNextPage!}
          loader={loader}
          dataLength={suggestionsData.getFriendSuggestions.edges.length}
        >
          <MDBRow>
            {suggestions.length === 0 &&
              <div
                className='d-flex justify-content-center align-items-center'
                style={{ minHeight: '200px' }}
              >It's empty here</div>
            }

            {suggestions.map((userEdge, index) => (
              <UserSuggestCard
                key={index}
                currentUserId={props.user.id}
                userId={userEdge.node.id}
                displayName={`${userEdge.node.firstName} ${userEdge.node.lastName} ${userEdge.node.middleName ?? ''}`}
                onRemoveSuggest={() => removeSuggest(userEdge.node.id)}
              />
            ))}
          </MDBRow>
        </InfiniteScroll> : <div />
      }
    </div>
  );
};

export default Suggestions;
