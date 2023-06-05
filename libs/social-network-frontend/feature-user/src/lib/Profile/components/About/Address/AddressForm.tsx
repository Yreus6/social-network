import React, { useState } from 'react';
import { Privacy } from '@sn-htc/social-network-frontend/ui-dropdowns';
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEditAddressForUserMutation } from '@sn-htc/social-network-frontend/data-access-user';

interface AddressFormProps {
  type: string;
  onCancel?: () => void;
  userId: string;
  city?: string;
  region?: string;
  country?: string;
  mode?: string;
  showToast?: () => void;
  updateProfile?: () => void;
}

const schema = yup.object({
  city: yup.string().required('City is required'),
  region: yup.string().required('Region is required'),
  country: yup.string().required('Country is required')
});

const AddressForm = (props: AddressFormProps) => {
  const [editAddress, { isLoading: isUpdating }] = useEditAddressForUserMutation();
  const [privacy, setPrivacy] = useState<string>(props.mode ?? 'PRIVACY');
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      city: props.city ?? '',
      region: props.region ?? '',
      country: props.country ?? ''
    },
    resolver: yupResolver(schema),
  });

  const onSetPrivacy = (privacy: string) => {
    setPrivacy(privacy);
  };

  const onSubmit = async (data) => {
    try {
      const addressInput = {
        city: data.city,
        region: data.region,
        country: data.country,
        mode: privacy === 'PRIVACY' ? 'PUBLIC' : privacy
      };

      await editAddress({
        userId: props.userId,
        addressInput
      }).unwrap();

      props.updateProfile && props.updateProfile();
    } catch {
      props.showToast && props.showToast();
    } finally {
      props.onCancel && props.onCancel();
    }
  };

  return (
    <form className='ps-2 d-flex flex-column w-100 mb-2' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex-grow-1'>
        <Controller
          name='city'
          control={control}
          render={({ field: { onChange, onBlur, name, value, ref } }) =>
            <>
              <MDBInput
                inputRef={ref}
                value={value}
                autoComplete={name}
                onChange={onChange}
                onBlur={onBlur}
                className={errors.city ? 'mb-2 is-invalid' : 'mb-2'}
                label='City'
                size='lg'
              />
              {errors.city &&
              <div className='invalid-feedback d-block position-relative mb-2'>
                {errors.city?.message}
              </div>
              }
            </>
          }
        />
        <Controller
          name='region'
          control={control}
          render={({ field: { onChange, onBlur, name, value, ref } }) =>
            <>
              <MDBInput
                inputRef={ref}
                value={value}
                autoComplete={name}
                onChange={onChange}
                onBlur={onBlur}
                className={errors.region ? 'mb-2 is-invalid' : 'mb-2'}
                label='Region'
                size='lg'
              />
              {errors.region &&
              <div className='invalid-feedback d-block position-relative mb-2'>
                {errors.region?.message}
              </div>
              }
            </>
          }
        />
        <Controller
          name='country'
          control={control}
          render={({ field: { onChange, onBlur, name, value, ref } }) =>
            <>
              <MDBInput
                inputRef={ref}
                value={value}
                autoComplete={name}
                onChange={onChange}
                onBlur={onBlur}
                className={errors.country ? 'is-invalid' : ''}
                label='Country'
                size='lg'
              />
              {errors.country &&
                <div className='invalid-feedback d-block position-relative mb-2'>
                  {errors.country?.message}
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

export default AddressForm;
