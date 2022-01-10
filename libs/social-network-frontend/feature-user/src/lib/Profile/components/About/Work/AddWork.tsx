import React, { useState } from 'react';
import WorkForm from './WorkForm';
import { MDBIcon } from 'mdb-react-ui-kit';

interface AddWorkProps {
  userId: string;
  updateWork?: () => void;
  showToast?: () => void;
}

const AddWork = (props: AddWorkProps) => {
  const [toggleEdit, setToggleEdit] = useState<boolean>(false);

  const handleToggleForm = () => {
    setToggleEdit(prev => !prev);
  };

  return (
    toggleEdit ?
    <WorkForm
      type='add'
      userId={props.userId}
      onCancel={handleToggleForm}
      updateWork={props.updateWork}
      showToast={props.showToast}
    /> :
    <h5
      onClick={handleToggleForm}
      className='d-flex align-items-center mb-4 add-info-profile link-primary'
      color='light'
    >
      <MDBIcon className='me-3' fas icon='plus' />
      <span>Add your work</span>
    </h5>
  );
};

export default AddWork;
