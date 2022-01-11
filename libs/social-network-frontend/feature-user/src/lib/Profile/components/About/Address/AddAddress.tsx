import React, { useEffect, useState } from 'react';
import AddressForm from './AddressForm';
import { MDBIcon } from 'mdb-react-ui-kit';

interface AddAddressProps {
  userId: string;
  updateProfile?: () => void;
  showToast?: () => void;
}

const AddAddress = (props: AddAddressProps) => {
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
      type='add'
      userId={props.userId}
      onCancel={handleToggleForm}
      updateProfile={props.updateProfile}
      showToast={props.showToast}
    /> :
    <p
      onClick={handleToggleForm}
      className='d-flex align-items-center mb-2 add-info-profile link-primary ps-2'
      color='light'
    >
      <div style={{ width: '30px' }}>
        <MDBIcon fas icon='plus' />
        <span>Add a living place</span>
      </div>
    </p>
  );
};

export default AddAddress;
