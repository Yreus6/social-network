import React, { useState } from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';
import EducationForm from './EducationForm';

interface AddEducationProps {
  userId: string;
  updateEdu?: () => void;
  showToast?: () => void;
}

const AddEducation = (props: AddEducationProps) => {
  const [toggleEdit, setToggleEdit] = useState<boolean>(false);

  const handleToggleForm = () => {
    setToggleEdit(prev => !prev);
  };

  return (
    toggleEdit ?
    <EducationForm
      type='add'
      userId={props.userId}
      onCancel={handleToggleForm}
      updateEdu={props.updateEdu}
      showToast={props.showToast}
    /> :
    <h5
      onClick={handleToggleForm}
      className='d-flex align-items-center mb-4 add-info-profile link-primary'
      color='light'
    >
      <MDBIcon className='me-3' fas icon='plus' />
      <span>Add your education</span>
    </h5>
  );
};

export default AddEducation;
