import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBInput, MDBSelect } from 'mdb-react-ui-kit';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEditGenderForUserMutation } from '@sn-htc/social-network-frontend/data-access-user';

interface GenderFormProps {
  type: string;
  onCancel?: () => void;
  userId: string;
  gender?: string;
  showToast?: () => void;
  updateProfile?: () => void;
}

const schema = yup.object({
  gender: yup.string().required('Gender is required'),
});

const GenderForm = (props: GenderFormProps) => {
  const [editGender, { isLoading: isUpdating }] = useEditGenderForUserMutation();
  const [gender, setGender] = useState<string>(props.gender ?? '');
  const [showInput, setShowInput] = useState<boolean>(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      gender: props.gender ?? ''
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    return () => {
      setShowInput(false);
      setGender('');
    };
  }, []);

  const handleSelect = (value) => {
    if (value) {
      if (value.text === 'Other') {
        setShowInput(true);
        setGender('');
      } else {
        setShowInput(false);
        setGender(value.text);
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      await editGender({
        userId: props.userId,
        gender: data.gender
      }).unwrap();
      props.updateProfile && props.updateProfile();
    } catch {
      props.showToast && props.showToast();
    } finally {
      props.onCancel && props.onCancel();
    }
  };

  const onSubmitForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      await editGender({
        userId: props.userId,
        gender
      }).unwrap();
      props.updateProfile && props.updateProfile();
    } catch {
      props.showToast && props.showToast();
    } finally {
      props.onCancel && props.onCancel();
    }
  };

  return (
    <form
      className='d-flex flex-column ps-2 mt-2'
      onSubmit={showInput ? handleSubmit(onSubmit) : onSubmitForm}
    >
      <MDBSelect
        className='mb-3'
        placeholder='Choose your gender'
        data={[
          { text: 'Male', value: 1, selected: gender === 'Male' },
          { text: 'Female', value: 2, selected: gender === 'Female' },
          { text: 'Other', value: 3, selected: gender !== 'Male' && gender !== 'Female' && props.type === 'edit' }
        ]}
        getValue={handleSelect}
      />
      {showInput &&
      <div className='mb-3'>
        <Controller
          name='gender'
          control={control}
          render={({ field: { onChange, onBlur, name, value, ref } }) =>
            <>
              <MDBInput
                inputRef={ref}
                value={value !== 'Male' && value !== 'Female' ? value : ''}
                autoComplete={name}
                onChange={onChange}
                onBlur={onBlur}
                className={errors.gender ? 'mb-3 is-invalid' : 'mb-3'}
                label='Gender'
              />
              {errors.gender &&
              <div className='invalid-feedback d-block position-relative mb-2'>
                {errors.gender?.message}
              </div>
              }
            </>
          }
        />
      </div>
      }
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

export default GenderForm;
