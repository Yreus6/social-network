import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MDBBtn } from 'mdb-react-ui-kit';
import { InputPassword } from '@sn-htc/social-network-frontend/ui-inputs';
import './PasswordForm.scss';
import { useOktaAuth } from '@okta/okta-react';
import { useChangePasswordForUserMutation } from '@sn-htc/social-network-frontend/data-access-user';

interface PasswordFormProps {
  onCancel?: () => void;
  userId: string;
  showToast?: () => void;
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/;
const passwordRegexMsg = 'Password must contains at least one lowercase, one uppercase, one number and one symbol (e.g., !@#$%^&*)';

const schema = yup.object({
  currentPassword: yup.string().required('Password is required')
    .matches(passwordRegex, passwordRegexMsg),
  newPassword: yup.string().required('Password is required')
    .matches(passwordRegex, passwordRegexMsg),
  confirmPassword: yup.string().required('Password is required')
    .matches(passwordRegex, passwordRegexMsg)
    .oneOf([yup.ref('newPassword')], 'Password must match')
});

const PasswordForm = (props: PasswordFormProps) => {
  const { oktaAuth } = useOktaAuth();
  const [changePassword, { isLoading: isUpdating }] = useChangePasswordForUserMutation();
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await changePassword({
        userId: props.userId,
        passwordInput: {
          oldPassword: data.currentPassword,
          newPassword: data.confirmPassword
        }
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='form-password-main'>
        <Controller
          name='currentPassword'
          control={control}
          render={({ field: { onChange, onBlur, name, value, ref } }) =>
            <>
              <div className='w-50'>
                <p className='mb-1'>Current <span>*</span></p>
                <InputPassword
                  inputRef={ref}
                  value={value}
                  autoComplete={name}
                  onChange={onChange}
                  onBlur={onBlur}
                  className={errors.currentPassword ? 'mb-0 is-invalid' : ''}
                />
              </div>
              {errors.currentPassword &&
              <div className='invalid-feedback d-block position-relative my-2'>
                {errors.currentPassword?.message}
              </div>
              }
            </>
          }
        />
        <Controller
          name='newPassword'
          control={control}
          render={({ field: { onChange, onBlur, name, value, ref } }) =>
            <>
              <div className='w-50'>
                <p className='mb-1'>New <span>*</span></p>
                <InputPassword
                  inputRef={ref}
                  value={value}
                  autoComplete={name}
                  onChange={onChange}
                  onBlur={onBlur}
                  className={errors.newPassword ? 'mb-0 is-invalid' : ''}
                />
              </div>
              {errors.newPassword &&
              <div className='invalid-feedback d-block position-relative my-2'>
                {errors.newPassword?.message}
              </div>
              }
            </>
          }
        />
        <Controller
          name='confirmPassword'
          control={control}
          render={({ field: { onChange, onBlur, name, value, ref } }) =>
            <>
              <div className='w-50'>
                <p className='mb-1'>Confirm <span>*</span></p>
                <InputPassword
                  inputRef={ref}
                  value={value}
                  autoComplete={name}
                  onChange={onChange}
                  onBlur={onBlur}
                  className={errors.confirmPassword ? 'mb-0 is-invalid' : ''}
                />
              </div>
              {errors.confirmPassword &&
              <div className='invalid-feedback d-block position-relative my-2'>
                {errors.confirmPassword?.message}
              </div>
              }
            </>
          }
        />
      </div>
      <div className='mt-2 d-flex justify-content-end align-items-center'>
        <MDBBtn onClick={props.onCancel} className='ms-2' type='button' color='light' size='sm' disabled={isUpdating}>Cancel</MDBBtn>
        <MDBBtn className='ms-2' size='sm' type='submit' disabled={isUpdating}>Save</MDBBtn>
      </div>
    </form>
  );
};

export default PasswordForm;
