import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBCheckbox, MDBDatepicker, MDBInput } from 'mdb-react-ui-kit';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAddJobForUserMutation, useEditJobForUserMutation } from '@sn-htc/social-network-frontend/data-access-user';
import { DateTime } from 'luxon';
import { Privacy } from '@sn-htc/social-network-frontend/ui-dropdowns';

interface WorkFormProps {
  type: string;
  onCancel?: () => void;
  userId: string;
  jobId?: string;
  company?: string;
  position?: string;
  city?: string;
  description?: string;
  currentWork?: boolean;
  workFrom?: string;
  workTo?: string;
  mode?: string;
  showToast?: () => void;
  updateWork?: () => void;
}

const schema = yup.object({
  company: yup.string().required('Company is required'),
  position: yup.string().required('Position is required'),
  city: yup.string().required('City is required'),
  description: yup.string(),
});

const WorkForm = (props: WorkFormProps) => {
  const [addJob, { isLoading: isAddUpdating }] = useAddJobForUserMutation();
  const [editJob, { isLoading: isEditUpdating }] = useEditJobForUserMutation();
  const [workFrom, setWorkFrom] = useState<string>(props.workFrom ?? '');
  const [workTo, setWorkTo] = useState<string>(props.workTo ?? '');
  const [currentWork, setCurrentWork] = useState<boolean>(props.currentWork ?? false);
  const [privacy, setPrivacy] = useState<string>(props.mode ?? 'PRIVACY');
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      company: props.company ?? '',
      position: props.position ?? '',
      city: props.city ?? '',
      description: props.description ?? '',
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (props.currentWork) {
      setWorkTo(DateTime.now().toFormat('dd-MM-yyyy'));
    }
  }, []);

  const handleCheck = (e: React.SyntheticEvent) => {
    const element = e.target as HTMLInputElement;
    if (element.checked) {
      setCurrentWork(true);
      setWorkTo(DateTime.now().toFormat('dd-MM-yyyy'));
    } else {
      setCurrentWork(false);
    }
  };

  const onSetPrivacy = (privacy: string) => {
    setPrivacy(privacy);
  };

  const onSubmit = async (data) => {
    try {
      const jobInput = {
        company: data.company,
        position: data.position,
        city: data.city,
        description: data.description,
        isCurrentWork: currentWork,
        fromDate: DateTime.fromFormat(workFrom, 'dd-MM-yyyy', { zone: 'utc' }).toISO(),
        toDate: DateTime.fromFormat(workTo, 'dd-MM-yyyy', { zone: 'utc' }).toISO(),
        mode: privacy === 'PRIVACY' ? 'PUBLIC' : privacy
      };

      switch (props.type) {
        case 'add':
          await addJob({
            userId: props.userId,
            jobInput
          }).unwrap();
          break;
        case 'edit':
          if (props.jobId) {
            await editJob({
              userId: props.userId,
              jobId: props.jobId,
              jobInput
            }).unwrap();
          }
          break;
        default:
      }

      props.updateWork && props.updateWork();
    } catch {
      props.showToast && props.showToast();
    } finally {
      props.onCancel && props.onCancel();
    }
  };

  return (
    <form className='d-flex flex-column w-100 mb-2 ps-2' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex-grow-1'>
        <Controller
          name='company'
          control={control}
          render={({ field: { onChange, onBlur, name, value, ref } }) =>
            <>
              <MDBInput
                inputRef={ref}
                value={value}
                autoComplete={name}
                onChange={onChange}
                onBlur={onBlur}
                className={errors.company ? 'mb-2 is-invalid' : 'mb-2'}
                label='Company'
                size='lg'
              />
              {errors.company &&
              <div className='invalid-feedback d-block position-relative mb-2'>
                {errors.company?.message}
              </div>
              }
            </>
          }
        />
        <Controller
          name='position'
          control={control}
          render={({ field: { onChange, onBlur, name, value, ref } }) =>
            <>
              <MDBInput
                inputRef={ref}
                value={value}
                autoComplete={name}
                onChange={onChange}
                onBlur={onBlur}
                className={errors.position ? 'mb-2 is-invalid' : 'mb-2'}
                label='Position'
                size='lg'
              />
              {errors.position &&
              <div className='invalid-feedback d-block position-relative mb-2'>
                {errors.position?.message}
              </div>
              }
            </>
          }
        />
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
          name='description'
          control={control}
          render={({ field: { onChange, onBlur, name, value, ref } }) =>
            <>
              <MDBInput
                inputRef={ref}
                value={value}
                autoComplete={name}
                onChange={onChange}
                onBlur={onBlur}
                className={errors.description ? 'mb-2 is-invalid' : 'mb-2'}
                label='Description'
                textarea
                rows={3}
                size='lg'
              />
              {errors.description &&
              <div className='invalid-feedback d-block position-relative mb-2'>
                {errors.description?.message}
              </div>
              }
            </>
          }
        />

        <div className='d-flex flex-column mb-2 w-50'>
          <MDBDatepicker
            labelText='From'
            format='dd-mm-yyyy'
            value={workFrom}
            setValue={setWorkFrom}
          />
          {!currentWork &&
          <>
            <div className='mb-2' />
            <MDBDatepicker
              labelText='To'
              format='dd-mm-yyyy'
              value={workTo}
              setValue={setWorkTo}
            />
          </>
          }
        </div>
        <MDBCheckbox
          name='isCurrentWork'
          value=''
          id='isCurrentWork'
          label='I currently work here'
          onClick={handleCheck}
          defaultChecked={props.currentWork}
        />
      </div>
      <hr className='mt-2 mb-2' />
      <div className='d-flex'>
        <div className='flex-grow-1'>
          <Privacy
            privacy={privacy}
            onSetPrivacy={onSetPrivacy}
          />
        </div>
        <MDBBtn
          className='me-2 shadow-0'
          onClick={props.onCancel}
          color='light'
          type='button'
        >
          Cancel
        </MDBBtn>
        <MDBBtn className='shadow-0' type='submit' disabled={isAddUpdating || isEditUpdating}>Save</MDBBtn>
      </div>
    </form>
  );
};

export default WorkForm;
