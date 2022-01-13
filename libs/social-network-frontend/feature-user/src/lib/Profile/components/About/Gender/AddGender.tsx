import React, { useEffect, useState } from 'react';
import GenderForm from './GenderForm';
import { MDBIcon } from 'mdb-react-ui-kit';

interface AddGenderProps {
  userId: string;
  updateProfile?: () => void;
  showToast?: () => void;
}

const AddGender = (props: AddGenderProps) => {
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
    <GenderForm
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
      <span style={{ width: '30px' }}>
        <MDBIcon fas icon='plus' />
      </span>
      <span>Add your gender</span>
    </p>
  );
};

export default AddGender;
