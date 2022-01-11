import React, { useEffect, useState } from 'react';
import GenderForm from './GenderForm';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

interface EditGenderProps {
  currentUserId: string;
  userId: string;
  updateProfile?: () => void;
  showToast?: () => void;
  gender: string;
}

const EditGender = (props: EditGenderProps) => {
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
        type='edit'
        userId={props.userId}
        onCancel={handleToggleForm}
        updateProfile={props.updateProfile}
        showToast={props.showToast}
        gender={props.gender}
      /> :
      <div className='d-flex flex-row align-items-center ps-2 pb-1'>
        <div style={{ width: '30px' }}>
          <MDBIcon fas icon='user' />
        </div>
        <div className='d-flex flex-column ms-3 flex-grow-1'>
          <p className='m-0'>{props.gender}</p>
        </div>
        {props.currentUserId === props.userId &&
          <>
            <MDBBtn
              color='light'
              onClick={handleToggleForm}
              floating
              className='shadow-0'
            >
              <MDBIcon fas icon='pen' />
            </MDBBtn>
          </>
      }
    </div>
  );
};

export default EditGender;
