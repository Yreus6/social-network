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
    <div className='d-flex align-items-center'>
      <MDBIcon className='me-3' fas icon='phone-alt' />
      <div className='d-flex flex-column flex-grow-1'>
        <p className='m-0'>{props.phone.phone}</p>
        <span>Mobile</span>
      </div>
      {props.currentUserId === props.userId &&
      <MDBBtn
        onClick={handleToggleForm}
        color='light'
        className='rounded-circle d-flex align-items-center justify-content-center'
        style={{ width: '3rem', height: '3rem', backgroundColor: 'rgb(219, 224, 229,0.8)' }}
      >
        <MDBIcon fas icon='pen' />
      </MDBBtn>
      }
    </div>
  );
};

export default EditPhone;
