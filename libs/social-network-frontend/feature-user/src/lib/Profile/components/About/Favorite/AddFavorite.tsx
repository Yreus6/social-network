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
    <h5
      onClick={handleToggleForm}
      className='d-flex align-items-center mb-4 add-info-profile link-primary'
      color='light'
    >
      <MDBIcon className='me-3' fas icon='plus' />
      <span>Add your favorite</span>
    </h5>
  );
};

export default AddFavorite;
