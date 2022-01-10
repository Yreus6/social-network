import React, { useState } from 'react';
import { MDBBtn, MDBCol, MDBSpinner } from 'mdb-react-ui-kit';
import './SentCard.scss';

interface SentCardProps {
  userId: string;
  displayName: string;
  countMutualFriends?: number;
  onClickUser?: () => void;
  onCancelRequest?: () => Promise<void>;
  isCancelling?: boolean;
}

export const SentCard = (props: SentCardProps) => {
  const [sentRequestStatus, setSentRequestStatus] = useState<string>('');

  const onCancel = async () => {
    props.onCancelRequest && await props.onCancelRequest();
    setSentRequestStatus('Cancelled');
  };

  return (
    <MDBCol className='sent-request' lg='2' md='3' sm='4' data-test={`sent-request-${props.userId}`}>
      <div className='sent-request-main'>
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
        <div className='sent-request-info ps-2 pe-2 pb-2'>
          <p
            className='name mb-0 mt-2'
            style={{ cursor: 'pointer' }}
            onClick={props.onClickUser}
          >
            {props.displayName}
          </p>
          <p className='mutual-friends mb-1'>{props.countMutualFriends} mutual friends</p>
          {sentRequestStatus === '' &&
          <MDBBtn
            onClick={onCancel}
            style={{ backgroundColor: '#DFE5F2' }}
            color='light'
            className='w-100 shadow-0'
            disabled={props.isCancelling}
          >
            {props.isCancelling ?
              <>
                <MDBSpinner size='sm' role='status' tag='span' className='me-2' />
                Cancel
              </> : <>Cancel</>
            }
          </MDBBtn>
          }

          {sentRequestStatus === 'Cancelled' &&
          <MDBBtn
            style={{ backgroundColor: '#DFE5F2' }}
            color='light'
            className='w-100 mt-2 shadow-0'
            disabled
          >
            Cancelled
          </MDBBtn>
          }
        </div>
      </div>
    </MDBCol>
  );
};
