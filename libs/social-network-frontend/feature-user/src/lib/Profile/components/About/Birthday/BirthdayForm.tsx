import React, { useState } from 'react';
import { Privacy } from '@sn-htc/social-network-frontend/ui-dropdowns';
import { MDBBtn, MDBDatepicker } from 'mdb-react-ui-kit';
import { DateTime } from 'luxon';
import { useEditBirthdayForUserMutation } from '@sn-htc/social-network-frontend/data-access-user';

interface BirthdayFormProps {
  type: string;
  onCancel?: () => void;
  userId: string;
  birthday?: string;
  mode?: string;
  showToast?: () => void;
  updateProfile?: () => void;
}

const BirthdayForm = (props: BirthdayFormProps) => {
  const [editBirthday, { isLoading: isUpdating }] = useEditBirthdayForUserMutation();
  const [birthday, setBirthday] = useState<string>(props.birthday ?? '');
  const [privacy, setPrivacy] = useState<string>(props.mode ?? 'PRIVACY');

  const onSetPrivacy = (privacy: string) => {
    setPrivacy(privacy);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const birthdayInput = {
        birthdate: DateTime.fromFormat(birthday, 'dd-MM-yyyy', { zone: 'utc' }).toISO(),
        mode: privacy === 'PRIVACY' ? 'PUBLIC' : privacy
      };
      await editBirthday({
        userId: props.userId,
        birthdayInput
      }).unwrap();
      props.updateProfile && props.updateProfile();
    } catch {
      props.showToast && props.showToast();
    } finally {
      props.onCancel && props.onCancel();
    }
  };

  return (
    <form className='ps-2 d-flex flex-column mb-2 pt-1' onSubmit={onSubmit}>
      <div className='w-50'>
        <MDBDatepicker
          labelText='Birthday'
          format='dd-mm-yyyy'
          value={birthday}
          setValue={setBirthday}
        />
      </div>
      <hr className='mt-2 mb-2' />
      <div className='d-flex flex-row'>
        <div className='flex-grow-1'>
          <Privacy
            privacy={privacy}
            onSetPrivacy={onSetPrivacy}
          />
        </div>
        <MDBBtn
          onClick={props.onCancel}
          className='me-2 shadow-0'
          color='light'
          type='button'
        >
          Cancel
        </MDBBtn>
        <MDBBtn className='shadow-0' type='submit' disabled={isUpdating}>Save</MDBBtn>
      </div>
    </form>
  );
};

export default BirthdayForm;
