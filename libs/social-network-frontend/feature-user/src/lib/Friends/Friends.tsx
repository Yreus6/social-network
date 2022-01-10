import React from 'react';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';
import './Friends.scss';

const Friends = (props: React.PropsWithChildren<unknown>) => {
  return (
    <div className='friend-page'>
      <MDBRow style={{ height: '3.75rem' }} />
      <MDBRow className='m-0'>
        <MDBCol md='1' xl='1' sm='0' />
        <MDBCol md='10' xl='10' sm='12' className='mt-3'>
          {props.children}
        </MDBCol>
        <MDBCol md='1' xl='1' sm='0' />
      </MDBRow>
    </div>
  );
};

export default Friends;
