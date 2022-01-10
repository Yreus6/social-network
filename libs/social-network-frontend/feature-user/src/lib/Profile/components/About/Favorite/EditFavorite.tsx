import React, { useEffect, useState } from 'react';
import FavoriteForm from './FavoriteForm';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

interface EditFavoriteProps {
  currentUserId: string;
  userId: string;
  updateProfile?: () => void;
  showToast?: () => void;
  favorite: string;
  favorites: Array<string>;
}

const EditFavorite = (props: EditFavoriteProps) => {
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
    <FavoriteForm
      type='edit'
      userId={props.userId}
      onCancel={handleToggleForm}
      updateProfile={props.updateProfile}
      showToast={props.showToast}
      favorite={props.favorite}
      favorites={props.favorites}
    /> :
    <div className='d-flex flex-row align-items-center mb-3'>
      <MDBIcon fas icon='circle' />
      <p className='m-0 ms-3 flex-grow-1'>{props.favorite}</p>
      <MDBBtn
        color='light'
        onClick={handleToggleForm}
        className='rounded-circle d-flex align-items-center justify-content-center'
        style={{ width: '3rem', height: '3rem', backgroundColor: 'rgb(219, 224, 229,0.8)' }}
      >
        <MDBIcon fas icon='pen' />
      </MDBBtn>
    </div>
  );
};

export default EditFavorite;
