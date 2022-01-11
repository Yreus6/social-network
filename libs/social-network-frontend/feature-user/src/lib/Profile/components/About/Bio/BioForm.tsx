import React from 'react';
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEditBioForUserMutation } from '@sn-htc/social-network-frontend/data-access-user';

interface BioFormProps {
  type: string;
  onCancel?: () => void;
  userId: string;
  biography?: string;
  showToast?: () => void;
  updateProfile?: () => void;
}

const schema = yup.object({
  biography: yup.string().required('Bio is required'),
});

const BioForm = (props: BioFormProps) => {
  const [editBio, { isLoading: isUpdating }] = useEditBioForUserMutation();
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      biography: props.biography ?? ''
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      await editBio({
        userId: props.userId,
        biography: data.biography
      }).unwrap();
      props.updateProfile && props.updateProfile();
    } catch {
      props.showToast && props.showToast();
    } finally {
      props.onCancel && props.onCancel();
    }
  };

  return (
    <form className='d-flex flex-column w-100 ps-2' onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='biography'
        control={control}
        render={({ field: { onChange, onBlur, name, value, ref } }) =>
          <>
            <MDBInput
              inputRef={ref}
              value={value}
              autoComplete={name}
              onChange={onChange}
              onBlur={onBlur}
              className={errors.biography ? 'mb-3 is-invalid' : 'mb-3'}
              label='Biography'
              textarea
              rows={4}
              size='lg'
            />
            {errors.biography &&
              <div className='invalid-feedback d-block position-relative mb-2'>
                {errors.biography?.message}
              </div>
            }
          </>
        }
      />
      <hr className='mt-2 mb-2' />

      <div className='d-flex mt-2 align-self-end'>
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

export default BioForm;
