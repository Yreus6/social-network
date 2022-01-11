import React, { useEffect, useState } from 'react';
import PhoneForm from './PhoneForm';
import { MDBIcon } from 'mdb-react-ui-kit';

interface AddPhoneProps {
  userId: string;
  updateProfile?: () => void;
  showToast?: () => void;
}

const AddPhone = (props: AddPhoneProps) => {
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
      </div>
      <span>Add a phone number</span>
    </p>
  );
};

export default AddPhone;
