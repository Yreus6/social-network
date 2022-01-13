import React, { useState } from 'react';
import { MDBBtn, MDBCol, MDBSpinner } from 'mdb-react-ui-kit';
import './SuggestCard.scss';

interface SuggestCardProps {
  userId: string;
  countMutualFriends?: number;
  displayName: string;
  onClickUser?: () => void;
  onAddFriend?: () => Promise<void>;
  onRemoveSuggest?: () => void;
  isAdding?: boolean;
  isRequestSent?: boolean | null;
}

export const SuggestCard = (props: SuggestCardProps) => {
  const [action, setAction] = useState<string>('');

  const onAdd = async () => {
    props.onAddFriend && await props.onAddFriend();
    setAction('Sent');
  };

  return (
    <MDBCol className='friend-suggest' xl='2' lg='3' md='4' sm='6'>
      <div className='friend-suggest-main'>
        <div className='image-wrapper hover-overlay' onClick={props.onClickUser}>
          <img className='picture-profile' src={'https://picsum.photos/200'} alt='Avatar' />
          <div
            className='mask overlay'
            style={{
              backgroundColor: 'rgba(57, 192, 237, 0.2)',
              cursor: 'pointer'
            }}
          />
        </div>
        <div className='friend-suggest-info ps-2 pe-2 pb-2'>
          <p
            className='name mb-0 mt-2'
            style={{ cursor: 'pointer' }}
            onClick={props.onClickUser}
          >{props.displayName}</p>
          <p className='mutual-friends mb-1'>{props.countMutualFriends} mutual friends</p>
          {action === '' && !props.isRequestSent &&
          <>
            <MDBBtn
              onClick={onAdd}
              color='primary'
              className='w-100 mb-2 shadow-0'
              disabled={props.isAdding}
            >
              {props.isAdding ?
                <>
                  <MDBSpinner size='sm' role='status' tag='span' className='me-2' />
                  Add
                </> : <>Add Friend</>
              }
            </MDBBtn>
            <MDBBtn
              onClick={props.onRemoveSuggest}
              style={{ backgroundColor: '#DFE5F2' }}
              color='light'
              className='w-100 shadow-0'
            >
              Remove
            </MDBBtn>
          </>
          }

          {(action === 'Sent' || props.isRequestSent) &&
          <MDBBtn
            style={{ backgroundColor: '#DFE5F2' }}
            color='light'
            className='w-100 mt-2 shadow-0'
            disabled
          >
            Sent
          </MDBBtn>
          }
        </div>
      </div>
    </MDBCol>
  );
};
