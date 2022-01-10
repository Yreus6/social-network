import React, { useState } from 'react';
import WorkForm from './WorkForm';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { Job } from '@sn-htc/social-network-frontend/data-access-user';
import { DateTime } from 'luxon';

interface EditWorkProps {
  currentUserId: string;
  userId: string;
  updateWork?: () => void;
  showToast?: () => void;
  job: Job;
}

const EditWork = (props: EditWorkProps) => {
  const [toggleEdit, setToggleEdit] = useState<boolean>(false);

  const handleToggleForm = () => {
    setToggleEdit(prev => !prev);
  };

  return (
    toggleEdit ?
    <WorkForm
      type='edit'
      userId={props.userId}
      onCancel={handleToggleForm}
      updateWork={props.updateWork}
      showToast={props.showToast}
      jobId={props.job.id!}
      company={props.job.company!}
      position={props.job.position!}
      city={props.job.city!}
      description={props.job.description!}
      currentWork={props.job.isCurrentWork!}
      workFrom={DateTime.fromISO(props.job.dateRange!.fromDate!.toString(), { zone: 'utc' }).toFormat('dd-MM-yyyy')}
      workTo={DateTime.fromISO(props.job.dateRange!.fromDate!.toString(), { zone: 'utc' }).toFormat('dd-MM-yyyy')}
      mode={props.job.mode!}
    /> :
    <div className='d-flex align-items-center mt-3'>
      <MDBIcon className='me-3' fas icon='briefcase' />
      <div className='d-flex flex-column justify-content-center flex-grow-1'>
        <p className='m-0'>
          {props.job.isCurrentWork ?
          <>
            Working at {props.job.company}
            <span className='d-block'>
              From {DateTime.fromISO(props.job.dateRange!.fromDate!.toString(), { zone: 'utc' }).toFormat('dd-MM-yyyy')}
            </span>
          </> :
          <>
            Worked at {props.job.company}
            <span className='d-block'>
              From {DateTime.fromISO(props.job.dateRange!.fromDate!.toString(), { zone: 'utc' }).toFormat('dd-MM-yyyy')}
              {' '} to {DateTime.fromISO(props.job.dateRange!.toDate!.toString(), { zone: 'utc' }).toFormat('dd-MM-yyyy')}
            </span>
          </>
          }
        </p>
      </div>
      {props.currentUserId === props.userId &&
      <MDBBtn
        onClick={handleToggleForm}
        color='light'
        className='rounded-circle d-flex align-items-center justify-content-center'
        style={{ width: '3rem', height: '3rem', backgroundColor: 'rgb(219, 224, 229,0.8)' }}
      >
        <MDBIcon fas icon='pen' />
      </MDBBtn>
      }
    </div>
  );
};

export default EditWork;
