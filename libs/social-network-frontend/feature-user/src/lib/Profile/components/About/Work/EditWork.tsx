import React, { useState } from 'react';
import WorkForm from './WorkForm';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { Job, useRemoveJobForUserMutation } from '@sn-htc/social-network-frontend/data-access-user';
import { DateTime } from 'luxon';

interface EditWorkProps {
  currentUserId: string;
  userId: string;
  updateWork?: () => void;
  showToast?: () => void;
  job: Job;
}

const EditWork = (props: EditWorkProps) => {
  const [removeJob, { isLoading: isUpdating }] = useRemoveJobForUserMutation();
  const [toggleEdit, setToggleEdit] = useState<boolean>(false);

  const handleToggleForm = () => {
    setToggleEdit(prev => !prev);
  };

  const removeWork = async () => {
    try {
      await removeJob({
        userId: props.userId,
        jobId: props.job.id
      }).unwrap();
      props.updateWork && props.updateWork();
    } catch {
      props.showToast && props.showToast();
    }
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
      <div className='d-flex align-items-center ps-2 pb-1'>
        <div style={{ width: '30px' }}>
          <MDBIcon fas icon='briefcase' />
        </div>
        <div className='d-flex flex-column justify-content-center flex-grow-1'>
          <p className='m-0'>
            {props.job.isCurrentWork ?
              <>
                Working at {props.job.company}
                <span className='d-block' style={{ lineHeight: '12px', fontSize: '12px' }}>
              From {DateTime.fromISO(props.job.dateRange!.fromDate!.toString(), { zone: 'utc' }).toFormat('dd-MM-yyyy')} to present
            </span>
              </> :
              <>
                Worked at {props.job.company}
                <span className='d-block' style={{ lineHeight: '12px', fontSize: '12px' }}>
              From {DateTime.fromISO(props.job.dateRange!.fromDate!.toString(), { zone: 'utc' }).toFormat('dd-MM-yyyy')}
                  {' '} to {DateTime.fromISO(props.job.dateRange!.toDate!.toString(), { zone: 'utc' }).toFormat('dd-MM-yyyy')}
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
            onClick={removeWork}
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

export default EditWork;
