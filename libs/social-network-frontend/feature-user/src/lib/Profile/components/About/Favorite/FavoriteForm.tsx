import React from 'react';
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEditInterestsForUserMutation } from '@sn-htc/social-network-frontend/data-access-user';

interface FavoriteFormProps {
  type: string;
  onCancel?: () => void;
  userId: string;
  favorite?: string;
  showToast?: () => void;
  updateProfile?: () => void;
  favorites?: Array<string>;
}

const schema = yup.object({
  favorite: yup.string().required('Favorite is required'),
});

const FavoriteForm = (props: FavoriteFormProps) => {
  const [editInterests, { isLoading: isUpdating }] = useEditInterestsForUserMutation();
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      favorite: props.favorite ?? ''
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      if (props.favorites) {
        const interests = [...props.favorites, data.favorite];
        await editInterests({
          userId: props.userId,
          interests
        }).unwrap();
      }
      props.updateProfile && props.updateProfile();
    } catch {
      props.showToast && props.showToast();
    } finally {
      props.onCancel && props.onCancel();
    }
  };

  return (
    <form className='d-flex flex-column w-100 my-3' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex-grow-1 '>
        <div className='w-100'>
          <Controller
            name='favorite'
            control={control}
            render={({ field: { onChange, onBlur, name, value, ref } }) =>
              <>
                <MDBInput
                  inputRef={ref}
                  value={value}
                  autoComplete={name}
                  onChange={onChange}
                  onBlur={onBlur}
                  className={errors.favorite ? 'mb-3 is-invalid' : 'mb-3'}
                  label='Favorite'
                />
                {errors.favorite &&
                <div className='invalid-feedback d-block position-relative mb-2'>
                  {errors.favorite?.message}
                </div>
                }
              </>
            }
          />

        </div>
      </div>
      <div className='d-flex align-self-end mb-3'>
        <MDBBtn
          onClick={props.onCancel}
          className='me-2'
          color='light'
          type='button'
        >
          Cancel
        </MDBBtn>
        <MDBBtn type='submit' disabled={isUpdating}>Save</MDBBtn>
      </div>
    </form>
  );
};

export default FavoriteForm;
