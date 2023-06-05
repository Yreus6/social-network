import React, { useEffect, useState } from 'react';
import BioForm from './BioForm';

interface EditBioProps {
  currentUserId: string;
  userId: string;
  updateProfile?: () => void;
  showToast?: () => void;
  biography: string;
}

const EditBio = (props: EditBioProps) => {
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
    <BioForm
      type='edit'
      userId={props.userId}
      onCancel={handleToggleForm}
      updateProfile={props.updateProfile}
      showToast={props.showToast}
      biography={props.biography}
    /> :
    <div className='d-flex flex-column'>
      <p className='mb-0' style={{ textAlign: 'justify' }}>
        {props.biography}
      </p>
      {props.currentUserId === props.userId &&
      <a
        onClick={handleToggleForm}
        className='link-primary text-decoration-underline align-self-end'
        style={{ cursor: 'pointer' }}
      >
        Edit
      </a>
      }
    </div>
  );
};

export default EditBio;
