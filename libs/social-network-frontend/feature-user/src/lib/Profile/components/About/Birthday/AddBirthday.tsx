import React, { useEffect, useState } from 'react';
import BirthdayForm from './BirthdayForm';
import { MDBIcon } from 'mdb-react-ui-kit';

interface AddBirthdayProps {
  userId: string;
  updateProfile?: () => void;
  showToast?: () => void;
}

const AddBirthday = (props: AddBirthdayProps) => {
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
    <BirthdayForm
      type='add'
      userId={props.userId}
      onCancel={handleToggleForm}
      updateProfile={props.updateProfile}
      showToast={props.showToast}
    /> :
    <h5
      onClick={handleToggleForm}
      className='d-flex align-items-center mb-4 add-info-profile link-primary'
      color='light'
    >
      <MDBIcon className='me-3' fas icon='plus' />
      <span>Add your birthday</span>
    </h5>
  );
};

export default AddBirthday;
