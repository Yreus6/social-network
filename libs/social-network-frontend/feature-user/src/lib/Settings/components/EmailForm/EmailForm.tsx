import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { useChangeEmailForUserMutation } from '@sn-htc/social-network-frontend/data-access-user';
import { useOktaAuth } from '@okta/okta-react';

interface EmailFormProps {
  onCancel?: () => void;
  userId: string;
  email: string;
  showToast?: () => void;
}

const schema = yup.object({
  email: yup.string().required('Email is required')
    .email('Email is invalid'),
});

const EmailForm = (props: EmailFormProps) => {
  const { oktaAuth } = useOktaAuth();
  const [changeEmail, { isLoading: isUpdating }] = useChangeEmailForUserMutation();
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: props.email,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await changeEmail({
        userId: props.userId,
        email: data.email
      }).unwrap();
      await oktaAuth.signOut({
        revokeAccessToken: true,
        revokeRefreshToken: true
      });
    } catch {
      props.showToast && props.showToast();
    } finally {
      props.onCancel && props.onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mb-2'>
      <Controller
        name='email'
        control={control}
        render={({ field: { onChange, onBlur, name, value, ref } }) =>
          <>
            <MDBInput
              inputRef={ref}
              value={value}
              autoComplete={name}
              onChange={onChange}
              onBlur={onBlur}
              className={errors.email ? 'mb-4 is-invalid' : 'mb-4'}
              label='Email'
              disabled={isUpdating} />
            {errors.email &&
            <div className='invalid-feedback d-block position-relative mb-2'>
              {errors.email?.message}
            </div>
            }
          </>
        }
      />
      <div className='mt-2 d-flex justify-content-end align-items-center'>
        <MDBBtn onClick={props.onCancel} className='ms-2' type='button' color='light' size='sm' disabled={isUpdating}>Cancel</MDBBtn>
        <MDBBtn className='ms-2' size='sm' type='submit' disabled={isUpdating}>Save</MDBBtn>
      </div>
    </form>
  );
};

export default EmailForm;
