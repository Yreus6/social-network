import React, { useState } from 'react';
import { Privacy } from '@sn-htc/social-network-frontend/ui-dropdowns';
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEditPhoneForUserMutation } from '@sn-htc/social-network-frontend/data-access-user';

interface PhoneFormProps {
  type: string;
  onCancel?: () => void;
  userId: string;
  phone?: string;
  mode?: string;
  showToast?: () => void;
  updateProfile?: () => void;
}

const schema = yup.object({
  phone: yup.string().required('Phone number is required'),
});

const PhoneForm = (props: PhoneFormProps) => {
  const [editPhone, { isLoading: isUpdating }] = useEditPhoneForUserMutation();
  const [privacy, setPrivacy] = useState<string>(props.mode ?? 'PRIVACY');
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      phone: props.phone ?? ''
    },
    resolver: yupResolver(schema)
  });

  const onSetPrivacy = (privacy: string) => {
    setPrivacy(privacy);
  };

  const onSubmit = async (data) => {
    try {
      const phoneInput = {
        phone: data.phone,
        mode: privacy === 'PRIVACY' ? 'PUBLIC' : privacy
      };
      await editPhone({
        userId: props.userId,
        phoneInput
      }).unwrap();
      props.updateProfile && props.updateProfile();
    } catch {
      props.showToast && props.showToast();
    } finally {
      props.onCancel && props.onCancel();
    }
  };

  return (
    <form className='d-flex flex-column w-100 mb-2 ps-2' onSubmit={handleSubmit(onSubmit)}>
      <div className='w-100 flex-grow-1'>
        <Controller
          name='phone'
          control={control}
          render={({ field: { onChange, onBlur, name, value, ref } }) =>
            <>
              <MDBInput
                inputRef={ref}
                value={value}
                autoComplete={name}
                onChange={onChange}
                onBlur={onBlur}
                className={errors.phone ? 'is-invalid' : ''}
                label='Phone Number'
              />
              {errors.phone &&
                <div className='invalid-feedback d-block position-relative mb-2'>
                  {errors.phone?.message}
                </div>
              }
            </>
          }
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
          className='me-2'
          color='light'
          onClick={props.onCancel}
          type='button'
        >
          Cancel
        </MDBBtn>
        <MDBBtn type='submit' disabled={isUpdating}>Save</MDBBtn>
      </div>
    </form>
  );
};

export default PhoneForm;
