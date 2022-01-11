import React, { useEffect, useState } from 'react';
import { Address } from '@sn-htc/social-network-frontend/data-access-user';
import AddressForm from './AddressForm';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

interface EditAddressProps {
  currentUserId: string;
  userId: string;
  updateProfile?: () => void;
  showToast?: () => void;
  address: Address;
}

const EditAddress = (props: EditAddressProps) => {
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
    <AddressForm
      type='edit'
      userId={props.userId}
      onCancel={handleToggleForm}
      updateProfile={props.updateProfile}
      showToast={props.showToast}
      city={props.address.city!}
      region={props.address.region!}
      country={props.address.country!}
      mode={props.address.mode!}
    /> :
      <div className='d-flex align-items-center ps-2 pb-1'>
        <div style={{ width: '30px' }}>
          <MDBIcon fas icon='home' />
        </div>
        <div className='d-flex flex-column justify-content-center flex-grow-1'>
          <p className='m-0'>
            {`${props.address.city}, ${props.address.region}, ${props.address.country}`}
          </p>
          <span>Address</span>
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

export default EditAddress;
