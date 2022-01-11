import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBCheckbox, MDBDatepicker, MDBInput } from 'mdb-react-ui-kit';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DateTime } from 'luxon';
import { Privacy } from '@sn-htc/social-network-frontend/ui-dropdowns';
import {
  useAddEducationForUserMutation,
  useEditEducationForUserMutation
} from '@sn-htc/social-network-frontend/data-access-user';

interface EducationFormProps {
  type: string;
  onCancel?: () => void;
  userId: string;
  educationId?: string;
  school?: string;
  graduate?: boolean;
  description?: string;
  concentrations?: Array<string>;
  degree?: string;
  studyFrom?: string;
  studyTo?: string;
  mode?: string;
  showToast?: () => void;
  updateEdu?: () => void;
}

const schema = yup.object({
  school: yup.string().required('School is required'),
  description: yup.string(),
  degree: yup.string(),
  concentration1: yup.string(),
  concentration2: yup.string(),
  concentration3: yup.string()
});

const EducationForm = (props: EducationFormProps) => {
  const [addEducation, { isLoading: isAddUpdating }] = useAddEducationForUserMutation();
  const [editEducation, { isLoading: isEditUpdating }] = useEditEducationForUserMutation();
  const [studyFrom, setStudyFrom] = useState<string>(props.studyFrom ?? '');
  const [studyTo, setStudyTo] = useState<string>(props.studyTo ?? '');
  const [graduate, setGraduate] = useState<boolean>(props.graduate ?? false);
  const [privacy, setPrivacy] = useState<string>(props.mode ?? 'PRIVACY');
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      school: props.school ?? '',
      description: props.description ?? '',
      degree: props.degree ?? '',
      concentration1: props.concentrations ? (props.concentrations[0] ?? '') : '',
      concentration2: props.concentrations ? (props.concentrations[1] ?? '') : '',
      concentration3: props.concentrations ? (props.concentrations[2] ?? '') : ''
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (props.graduate) {
      setStudyTo(DateTime.now().toFormat('dd-MM-yyyy'));
    }
  }, []);

  const handleCheck = (e: React.SyntheticEvent) => {
    const element = e.target as HTMLInputElement;
    if (element.checked) {
      setGraduate(true);
      setStudyTo(DateTime.now().toFormat('dd-MM-yyyy'));
    } else {
      setGraduate(false);
    }
  };

  const onSetPrivacy = (privacy: string) => {
    setPrivacy(privacy);
  };

  const onSubmit = async (data) => {
    try {
      const concentrations: Array<string> = [];
      if (data.concentration1 !== '') {
        concentrations.push(data.concentration1);
      }
      if (data.concentration2 !== '') {
        concentrations.push(data.concentration2);
      }
      if (data.concentration3 !== '') {
        concentrations.push(data.concentration3);
      }

      const eduInput = {
        school: data.school,
        isGraduate: graduate,
        description: data.description,
        concentrations,
        degree: data.degree,
        fromDate: DateTime.fromFormat(studyFrom, 'dd-MM-yyyy', { zone: 'utc' }).toISO(),
        toDate: DateTime.fromFormat(studyTo, 'dd-MM-yyyy', { zone: 'utc' }).toISO(),
        mode: privacy === 'PRIVACY' ? 'PUBLIC' : privacy
      };

      switch (props.type) {
        case 'add':
          await addEducation({
            userId: props.userId,
            educationInput: eduInput
          }).unwrap();
          break;
        case 'edit':
          if (props.educationId) {
            await editEducation({
              userId: props.userId,
              educationId: props.educationId,
              educationInput: eduInput
            }).unwrap();
          }
          break;
        default:
      }

      props.updateEdu && props.updateEdu();
    } catch {
      props.showToast && props.showToast();
    } finally {
      props.onCancel && props.onCancel();
    }
  };

  return (
    <form className='d-flex flex-column w-100 ps-2' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex-grow-1 mb-0'>
        <Controller
          name='school'
          control={control}
          render={({ field: { onChange, onBlur, name, value, ref } }) =>
            <>
              <MDBInput
                inputRef={ref}
                value={value}
                autoComplete={name}
                onChange={onChange}
                onBlur={onBlur}
                className={errors.school ? 'mb-2 is-invalid' : 'mb-2'}
                label='School'
                size='lg'
              />
              {errors.school &&
              <div className='invalid-feedback d-block position-relative mb-2'>
                {errors.school?.message}
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

        <label style={{ fontWeight: 400 }}>Concentrations</label>
        <Controller
          name='concentration1'
          control={control}
          render={({ field: { onChange, onBlur, name, value, ref } }) =>
            <>
              <MDBInput
                inputRef={ref}
                value={value}
                autoComplete={name}
                onChange={onChange}
                onBlur={onBlur}
                className='mb-2'
                label='Concentration'
                size='lg'
              />
            </>
          }
        />
        <Controller
          name='concentration2'
          control={control}
          render={({ field: { onChange, onBlur, name, value, ref } }) =>
            <>
              <MDBInput
                inputRef={ref}
                value={value}
                autoComplete={name}
                onChange={onChange}
                onBlur={onBlur}
                className='mb-2'
                label='Concentration'
                size='lg'
              />
            </>
          }
        />
        <Controller
          name='concentration3'
          control={control}
          render={({ field: { onChange, onBlur, name, value, ref } }) =>
            <>
              <MDBInput
                inputRef={ref}
                value={value}
                autoComplete={name}
                onChange={onChange}
                onBlur={onBlur}
                className='mb-2'
                label='Concentration'
                size='lg'
              />
            </>
          }
        />

        <Controller
          name='degree'
          control={control}
          render={({ field: { onChange, onBlur, name, value, ref } }) =>
            <>
              <MDBInput
                inputRef={ref}
                value={value}
                autoComplete={name}
                onChange={onChange}
                onBlur={onBlur}
                className={errors.degree ? 'mb-2 is-invalid' : 'mb-2'}
                label='Degree'
                size='lg'
              />
              {errors.degree &&
              <div className='invalid-feedback d-block position-relative mb-2'>
                {errors.degree?.message}
              </div>}
            </>
          }
        />

        <div className='d-flex flex-column mb-2 w-50'>
          <MDBDatepicker
            labelText='From'
            format='dd-mm-yyyy'
            value={studyFrom}
            setValue={setStudyFrom}
          />
          {!graduate &&
          <>
            <div className='mb-2' />
            <MDBDatepicker
              labelText='To'
              format='dd-mm-yyyy'
              value={studyTo}
              setValue={setStudyTo}
            />
          </>
          }
        </div>
        <MDBCheckbox
          name='isGraduate'
          value=''
          id='isGraduate'
          label='Graduated'
          onClick={handleCheck}
          defaultChecked={props.graduate}
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
          onClick={props.onCancel}
          className='me-2 shadow-0'
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

export default EducationForm;
