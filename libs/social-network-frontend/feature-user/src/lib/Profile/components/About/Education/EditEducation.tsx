import React, { useState } from 'react';
import { Education, useRemoveEducationForUserMutation } from '@sn-htc/social-network-frontend/data-access-user';
import EducationForm from './EducationForm';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { DateTime } from 'luxon';

interface EditEducationProps {
  currentUserId: string;
  userId: string;
  updateEdu?: () => void;
  showToast?: () => void;
  education: Education;
}

const EditEducation = (props: EditEducationProps) => {
  const [removeEducation, { isLoading: isUpdating }] = useRemoveEducationForUserMutation();
  const [toggleEdit, setToggleEdit] = useState<boolean>(false);

  const handleToggleForm = () => {
    setToggleEdit(prev => !prev);
  };

  const removeEdu = async () => {
    try {
      await removeEducation({
        userId: props.userId,
        educationId: props.education.id
      }).unwrap();
      props.updateEdu && props.updateEdu();
    } catch {
      props.showToast && props.showToast();
    }
  };

  return (
    toggleEdit ?
      <EducationForm
        type='edit'
        userId={props.userId}
        onCancel={handleToggleForm}
        updateEdu={props.updateEdu}
        showToast={props.showToast}
        educationId={props.education.id!}
        school={props.education.school!}
        graduate={props.education.isGraduate!}
        description={props.education.description!}
        concentrations={props.education.concentrations!.map(c => c ?? '')}
        degree={props.education.degree!}
        studyFrom={DateTime.fromISO(props.education.dateRange!.fromDate!.toString(), { zone: 'utc' }).toFormat('dd-MM-yyyy')}
        studyTo={DateTime.fromISO(props.education.dateRange!.toDate!.toString(), { zone: 'utc' }).toFormat('dd-MM-yyyy')}
        mode={props.education.mode!}
      /> :
      <div className='d-flex align-items-center ps-2 pb-0'>
        <div style={{ width: '30px' }}>
          <MDBIcon fas icon='graduation-cap' />
        </div>
        <div className='d-flex flex-column justify-content-center flex-grow-1'>
          <p className='m-0'>
            {!props.education.isGraduate ?
              <>
                Studying at {props.education.school}
                <span className='d-block' style={{ lineHeight: '12px', fontSize: '12px' }}>
                From {DateTime.fromISO(props.education.dateRange!.fromDate!.toString(), { zone: 'utc' }).toFormat('dd-MM-yyyy')}
                  {' '} to {DateTime.fromISO(props.education.dateRange!.toDate!.toString(), { zone: 'utc' }).toFormat('dd-MM-yyyy')}
              </span>
              </> :
              <>
                Studied at {props.education.school}
                <span className='d-block' style={{ lineHeight: '12px', fontSize: '12px' }}>
                From {DateTime.fromISO(props.education.dateRange!.fromDate!.toString(), { zone: 'utc' }).toFormat('dd-MM-yyyy')}
                  {' '} to {DateTime.fromISO(props.education.dateRange!.toDate!.toString(), { zone: 'utc' }).toFormat('dd-MM-yyyy')}
              </span>
              </>
          }
        </p>
      </div>
      {props.currentUserId === props.userId &&
        <>
          <MDBBtn
            onClick={handleToggleForm}
            color='light'
            floating
            className='shadow-0'
          >
            <MDBIcon fas icon='pen' />
          </MDBBtn>
          <MDBBtn
            onClick={removeEdu}
            color='light'
            floating
            className='shadow-0 ms-1'
            disabled={isUpdating}
          >
            <MDBIcon fas icon='trash' />
          </MDBBtn>
        </>
      }
    </div>
  );
};

export default EditEducation;
