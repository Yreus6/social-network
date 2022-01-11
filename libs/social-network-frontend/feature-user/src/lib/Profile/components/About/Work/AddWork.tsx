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
    <p
      onClick={handleToggleForm}
      className='d-flex align-items-center mb-2 add-info-profile link-primary ps-2'
      color='light'
    >
      <div style={{ width: '30px' }}>
        <MDBIcon fas icon='plus' />
      </div>
      <span>Add your work</span>
    </p>
  );
};

export default AddWork;
