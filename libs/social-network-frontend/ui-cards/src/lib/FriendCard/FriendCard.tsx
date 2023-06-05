import React from 'react';
import { MDBCard } from 'mdb-react-ui-kit';
import './FriendCard.scss';

interface FriendCardProps {
  displayName: string;
  countMutualFriends?: number;
  onClickUser?: () => void;
  showMutual?: boolean;
}

export const FriendCard = (props: FriendCardProps) => {
  return (
    <MDBCard className='friend d-flex flex-row'>
      <img className='avatar' src={'https://picsum.photos/200'} alt='Avatar' />
      <div className='d-flex flex-column ms-3 justify-content-center'>
        <h3 className='username m-0 p-0' onClick={props.onClickUser}>
          {props.displayName}
        </h3>
        {props.showMutual &&
        <p className='mutual-friends m-0 p-0'>
          {props.countMutualFriends} mutual friends
        </p>
        }
      </div>
    </MDBCard>
  );
};
