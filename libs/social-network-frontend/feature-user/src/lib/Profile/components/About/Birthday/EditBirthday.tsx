import React, { useEffect, useState } from 'react';
import BirthdayForm from './BirthdayForm';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { Birthday } from '@sn-htc/social-network-frontend/data-access-user';
import { DateTime } from 'luxon';

interface EditBirthdayProps {
  currentUserId: string;
  userId: string;
  updateProfile?: () => void;
  showToast?: () => void;
  birthday: Birthday;
}

const EditBirthday = (props: EditBirthdayProps) => {
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
      <BirthdayForm
        type='edit'
        userId={props.userId}
        onCancel={handleToggleForm}
        updateProfile={props.updateProfile}
        showToast={props.showToast}
        birthday={DateTime.fromISO(props.birthday.birthdate!.toString(), { zone: 'utc' }).toFormat('dd-MM-yyyy')}
        mode={props.birthday.mode!}
      /> :
      <div className='d-flex flex-row align-items-center ps-2 pb-1'>
        <div style={{
          width: '30px'
        }}>
          <MDBIcon fas icon='birthday-cake' />
        </div>
        <div className='d-flex flex-column ms-3 flex-grow-1' style={{ lineHeight: '20px' }}>
          <p className='m-0'>
            {DateTime.fromISO(props.birthday.birthdate!.toString(), { zone: 'utc' }).toFormat('LLLL dd')}
          </p>
          <span>
          {DateTime.fromISO(props.birthday.birthdate!.toString(), { zone: 'utc' }).toFormat('yyyy')}
        </span>
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

export default EditBirthday;
