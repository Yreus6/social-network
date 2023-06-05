import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBIcon, MDBToast } from 'mdb-react-ui-kit';
import { useGetEducationsForUserQuery, useGetJobsForUserQuery } from '@sn-htc/social-network-frontend/data-access-user';
import AddWork from './Work/AddWork';
import EditWork from './Work/EditWork';
import AddEducation from './Education/AddEducation';
import EditEducation from './Education/EditEducation';

interface WorkAndEducationProps {
  currentUserId: string;
  userId: string;
}

const WorkAndEducation = (props: WorkAndEducationProps) => {
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);
  const { data: jobsData, isLoading: isJobsLoading, refetch: jobsRefetch } = useGetJobsForUserQuery({
    userId: props.userId
  });
  const { data: edusData, isLoading: isEdusLoading, refetch: edusRefetch } = useGetEducationsForUserQuery({
    userId: props.userId
  });

  useEffect(() => {
    if (showErrorToast) {
      setTimeout(() => {
        setShowErrorToast(false);
      }, 3000);
    }
  }, [showErrorToast]);

  const updateWork = () => {
    jobsRefetch();
  };

  const updateEdu = () => {
    edusRefetch();
  };

  return (
    <>
      <MDBContainer className='ps-2 pb-2 pe-2'>
        <h6 className='mb-3 about-content-header'>Work</h6>
        {props.currentUserId === props.userId &&
          <AddWork
            userId={props.userId}
            updateWork={updateWork}
            showToast={() => setShowErrorToast(true)}
          />
        }
        {props.currentUserId !== props.userId && !isJobsLoading && jobsData?.getJobs?.length === 0 &&
          <div className='d-flex align-items-center ps-2 pb-1'>
            <div style={{ width: '30px' }}>
              <MDBIcon fas icon='briefcase' />
            </div>
            <div className='d-flex flex-column justify-content-center flex-grow-1'>
              <p className='m-0'>No workplace to show</p>
            </div>
          </div>
        }

        {!isJobsLoading && jobsData?.getJobs && jobsData.getJobs.map((job, index) =>
          <EditWork
            key={index}
            currentUserId={props.currentUserId}
            userId={props.userId}
            updateWork={updateWork}
            showToast={() => setShowErrorToast(true)}
            job={job!}
          />
        )}
      </MDBContainer>

      <MDBContainer className='ps-2 pb-2 pe-2'>
        <h6 className='mt-1 mb-3 about-content-header'>Education</h6>
        {props.currentUserId === props.userId &&
          <AddEducation
            userId={props.userId}
            updateEdu={updateEdu}
            showToast={() => setShowErrorToast(true)}
          />
        }
        {props.currentUserId !== props.userId && !isEdusLoading && edusData?.getEducations?.length === 0 &&
          <div className='d-flex align-items-center ps-2 pb-0'>
            <div style={{ width: '30px' }}>
              <MDBIcon fas icon='graduation-cap' />
            </div>
            <div className='d-flex flex-column justify-content-center flex-grow-1'>
              <p className='m-0'>No school to show</p>
            </div>
          </div>
        }

        {!isEdusLoading && edusData?.getEducations && edusData.getEducations.map((edu, index) =>
          <EditEducation
            key={index}
            currentUserId={props.currentUserId}
            userId={props.userId}
            updateEdu={updateEdu}
            showToast={() => setShowErrorToast(true)}
            education={{
              ...edu!,
              concentrations: edu!.concentrations!.map(c => c ?? '')
            }}
          />
        )}

      </MDBContainer>
      <MDBToast
        color='danger'
        show={showErrorToast}
        autohide
        position='top-right'
        delay={3000}
        appendToBody
        headerContent={
          <>
            <strong className='me-auto'>Error!</strong>
          </>
        }
        bodyContent='An error occurred. Please retry'
      />
    </>
  );
};

export default WorkAndEducation;
