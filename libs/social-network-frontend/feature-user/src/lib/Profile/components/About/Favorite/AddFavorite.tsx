import React, { useEffect, useState } from 'react';
import FavoriteForm from './FavoriteForm';
import { MDBIcon } from 'mdb-react-ui-kit';

interface AddFavoriteProps {
  userId: string;
  updateProfile?: () => void;
  showToast?: () => void;
  favorites: Array<string>;
}

const AddFavorite = (props: AddFavoriteProps) => {
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
      type='add'
      userId={props.userId}
      onCancel={handleToggleForm}
      updateProfile={props.updateProfile}
      showToast={props.showToast}
      favorites={props.favorites}
    /> :
    <p
      onClick={handleToggleForm}
      className='d-flex align-items-center mb-2 add-info-profile link-primary ps-2'
      color='light'
    >
      <span style={{ width: '30px' }}>
        <MDBIcon fas icon='plus' />
      </span>
      <span>Add your favorite</span>
    </p>
  );
};

export default AddFavorite;
