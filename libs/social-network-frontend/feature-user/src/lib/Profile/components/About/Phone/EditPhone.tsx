import React, { useEffect, useState } from 'react';
import { PhoneNumber } from '@sn-htc/social-network-frontend/data-access-user';
import PhoneForm from './PhoneForm';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

interface EditPhoneProps {
  currentUserId: string;
  userId: string;
  updateProfile?: () => void;
  showToast?: () => void;
  phone: PhoneNumber;
}

const EditPhone = (props: EditPhoneProps) => {
  const [toggleEdit, setToggleEdit] = useState<boolean>(false);

  const handleToggleForm = () => {
    setToggleEdit(prev => !prev);
  };

  useEffect(() => {
    return () => {
      setToggleEdit(false);
    };
  }, []);

  return (
    toggleEdit ?
      <PhoneForm
        type='edit'
        userId={props.userId}
        onCancel={handleToggleForm}
        updateProfile={props.updateProfile}
        showToast={props.showToast}
        phone={props.phone.phone!}
        mode={props.phone.mode!}
      /> :
      <div className='d-flex align-items-center ps-2 pb-1'>
        <div style={{ width: '30px' }}>
          <MDBIcon fas icon='phone-alt' />
        </div>
        <div className='d-flex flex-column flex-grow-1'>
          <p className='m-0'>{props.phone.phone}</p>
          <span style={{ lineHeight: '12px', fontSize: '12px' }}>
          Mobile
        </span>
        </div>
        {props.currentUserId === props.userId &&
          <>
            <MDBBtn
              onClick={handleToggleForm}
              color='light'
              floating
              className='shadow-0'
            >
              <MDBIcon fas icon='pen' />
            </MDBBtn>
            <MDBBtn color='light' floating className='shadow-0 ms-1'>
              <MDBIcon fas icon='trash' />
            </MDBBtn>
          </>
      }
    </div>
  );
};

export default EditPhone;
