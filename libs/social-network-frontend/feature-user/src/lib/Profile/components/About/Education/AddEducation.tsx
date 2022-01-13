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
    <p
      onClick={handleToggleForm}
      className='d-flex align-items-center mb-1 add-info-profile link-primary ps-2'
      color='light'
    >
      <span style={{ width: '30px' }}>
        <MDBIcon fas icon='plus' />
      </span>
      <span>Add your education</span>
    </p>
  );
};

export default AddEducation;
