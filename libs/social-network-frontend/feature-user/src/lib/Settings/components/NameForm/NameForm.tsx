import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import {
  useChangeNameForUserMutation
} from '@sn-htc/social-network-frontend/data-access-user';

interface NameFormProps {
  onCancel?: () => void;
  userId: string;
  fname: string;
  lname: string;
  mname: string;
  updateUser: () => Promise<void>;
  showToast?: () => void;
}

const schema = yup.object({
  firstName: yup.string().required('First Name is required'),
  middleName: yup.string(),
  lastName: yup.string().required('Last Name is required'),
});

const NameForm = (props: NameFormProps) => {
  const [changeName, { isLoading: isUpdating }] = useChangeNameForUserMutation();
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: props.fname,
      middleName: props.mname,
      lastName: props.lname,
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: {firstName: string, middleName: string, lastName: string}) => {
    try {
      await changeName({
        userId: props.userId,
        nameInput: {
          firstName: data.firstName,
          middleName: data.middleName,
          lastName: data.lastName,
        }
      }).unwrap();
      await props.updateUser();
    } catch {
      props.showToast && props.showToast();
    } finally {
      props.onCancel && props.onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mb-2'>
      <Controller
        name='firstName'
        control={control}
        render={({ field: { onChange, name, value, onBlur, ref } }) =>
          <>
            <MDBInput
              value={value}
              autoComplete={name}
              inputRef={ref}
              onChange={onChange}
              onBlur={onBlur}
              className={errors.firstName ? 'mb-4 is-invalid' : 'mb-4'}
              label='First Name'
              disabled={isUpdating}/>
            {errors.firstName &&
            <div className='invalid-feedback d-block position-relative mb-2'>
              {errors.firstName?.message}
            </div>
            }
          </>
        }
      />
      <Controller
        name='middleName'
        control={control}
        render={({ field: { onChange, name, value, onBlur, ref } }) =>
          <>
            <MDBInput
              value={value}
              autoComplete={name}
              inputRef={ref}
              onChange={onChange}
              onBlur={onBlur}
              className={errors.middleName ? 'mb-4 is-invalid' : 'mb-4'}
              label='Middle Name'
              disabled={isUpdating}/>
            {errors.middleName &&
            <div className='invalid-feedback d-block position-relative mb-2'>
              {errors.middleName?.message}
            </div>
            }
          </>
        }
      />
      <Controller
        name='lastName'
        control={control}
        render={({ field : { onChange, name, value, onBlur, ref } }) =>
          <>
            <MDBInput
              value={value}
              autoComplete={name}
              inputRef={ref}
              onChange={onChange}
              onBlur={onBlur}
              className={errors.lastName ? 'mb-4 is-invalid' : 'mb-4'}
              label='Last Name'
              disabled={isUpdating} />
            {errors.lastName &&
            <div className='invalid-feedback d-block position-relative mb-2'>
              {errors.lastName?.message}
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

export default NameForm;
