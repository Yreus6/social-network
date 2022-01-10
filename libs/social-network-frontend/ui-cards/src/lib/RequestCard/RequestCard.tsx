import React, { useState } from 'react';
import { MDBBtn, MDBCol, MDBSpinner } from 'mdb-react-ui-kit';
import './RequestCard.scss';

interface RequestCardProps {
  userId: string;
  displayName: string;
  countMutualFriends?: number;
  onClickUser?: () => void;
  onAcceptRequest?: () => Promise<void>;
  onRemoveRequest?: () => Promise<void>;
  isAccepting?: boolean;
  isRemoving?: boolean;
}

export const RequestCard = (props: RequestCardProps) => {
  const [requestStatus, setRequestStatus] = useState<string>('');

  const onAccept = async () => {
    props.onAcceptRequest && await props.onAcceptRequest();
    setRequestStatus('Accepted');
  };

  const onRemove = async () => {
    props.onRemoveRequest && await props.onRemoveRequest();
    setRequestStatus('Removed');
  };

  return (
    <MDBCol className='friend-request' lg='2' md='3' sm='4' data-test={`friend-request-${props.userId}`}>
      <div className='friend-request-main'>
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
        <div className='friend-request-info ps-2 pe-2 pb-2'>
          <p
            className='name mb-0 mt-2'
            style={{ cursor: 'pointer' }}
            onClick={props.onClickUser}
          >{props.displayName}</p>
          <p className='mutual-friends mb-1'>{props.countMutualFriends} mutual friends</p>
          {requestStatus === '' &&
          <>
            <MDBBtn
              data-test='accept-friend-btn'
              onClick={onAccept}
              color='primary'
              className='w-100 mb-2 shadow-0'
              disabled={props.isAccepting}
            >
              {props.isAccepting ?
              <>
                <MDBSpinner size='sm' role='status' tag='span' className='me-2' />
                Accept
              </> : <>Accept</>
              }
            </MDBBtn>
            <MDBBtn
              onClick={onRemove}
              style={{ backgroundColor: '#DFE5F2' }}
              color='light'
              className='w-100 shadow-0'
              disabled={props.isRemoving}
            >
              {props.isRemoving ?
              <>
                <MDBSpinner size='sm' role='status' tag='span' className='me-2' />
                Remove
              </> : <>Remove</>
              }
            </MDBBtn>
          </>
          }

          {requestStatus === 'Accepted' &&
          <>
            <div style={{ height: '36px' }} />
            <MDBBtn
              data-test='accepted-friend-btn'
              style={{ backgroundColor: '#DFE5F2' }}
              color='light'
              className='w-100 mt-2 shadow-0 px-0'
              disabled
            >
              Accepted
            </MDBBtn>
          </>
          }

          {requestStatus === 'Removed' &&
          <>
            <div style={{ height: '36px' }} />
            <MDBBtn
              style={{ backgroundColor: '#DFE5F2' }}
              color='light'
              className='w-100 mt-2 shadow-0'
              disabled
            >
              Removed
            </MDBBtn>
          </>
          }
        </div>
      </div>
    </MDBCol>
  );
};
