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
      <div className='d-flex flex-row align-items-center ps-2 pb-0'>
        <div style={{ width: '30px' }}>
          <MDBIcon fas icon='circle' />
        </div>
        <div className='d-flex flex-column justify-content-center flex-grow-1'>
          <p className='m-0'>{props.favorite}</p>
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
            <MDBBtn color='light' floating className='shadow-0 ms-1'>
              <MDBIcon fas icon='trash' />
            </MDBBtn>
          </>
        }
      </div>
  );
};

export default EditFavorite;
