import React, { useEffect, useState } from 'react';
import { Profile, useGetProfileForUserQuery } from '@sn-htc/social-network-frontend/data-access-user';
import AddBio from './Bio/AddBio';
import { MDBContainer, MDBIcon, MDBToast } from 'mdb-react-ui-kit';
import EditBio from './Bio/EditBio';
import AddBirthday from './Birthday/AddBirthday';
import EditBirthday from './Birthday/EditBirthday';
import AddGender from './Gender/AddGender';
import EditGender from './Gender/EditGender';
import AddFavorite from './Favorite/AddFavorite';
import EditFavorite from './Favorite/EditFavorite';

interface InfoProps {
  currentUserId: string;
  userId: string;
  profile: Profile;
}

const Info = (props: InfoProps) => {
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);
  const { refetch } = useGetProfileForUserQuery({
    userId: props.userId
  });

  useEffect(() => {
    if (showErrorToast) {
      setTimeout(() => {
        setShowErrorToast(false);
      }, 3000);
    }
  }, [showErrorToast]);

  const updateProfile = () => {
    refetch();
  };

  return (
    <>
      <MDBContainer className='ps-2 pb-2 pe-2'>
        <h6 className='mb-2 about-content-header'>Bio</h6>
        {props.currentUserId === props.userId && !props.profile.biography &&
          <AddBio
            userId={props.userId}
            updateProfile={updateProfile}
            showToast={() => setShowErrorToast(true)}
          />
        }
        {props.currentUserId !== props.userId && !props.profile.biography &&
          <div className='d-flex flex-column'>
            <p className='mb-0' style={{ textAlign: 'justify' }}>
            No biography to show
          </p>
        </div>
        }

        {props.profile.biography &&
          <EditBio
            currentUserId={props.currentUserId}
            userId={props.userId}
            biography={props.profile.biography}
            updateProfile={updateProfile}
            showToast={() => setShowErrorToast(true)}
          />
        }
      </MDBContainer>
      <MDBContainer className='ps-2 pb-2 pe-2'>
        <h6 className='mb-2 about-content-header'>Birthday</h6>
        {props.currentUserId === props.userId && !props.profile.birthday &&
          <AddBirthday
            userId={props.userId}
            updateProfile={updateProfile}
            showToast={() => setShowErrorToast(true)}
          />
        }
        {props.currentUserId !== props.userId && !props.profile.birthday &&
          <div className='d-flex flex-row align-items-center'>
            <MDBIcon size='lg' fas icon='birthday-cake' />
          <div className='d-flex flex-column ms-3 flex-grow-1'>
            <p className='m-0'>
              No birthday to show
            </p>
          </div>
        </div>
        }

        {props.profile.birthday &&
          <EditBirthday
            currentUserId={props.currentUserId}
            userId={props.userId}
            birthday={props.profile.birthday}
            updateProfile={updateProfile}
            showToast={() => setShowErrorToast(true)}
          />
        }
      </MDBContainer>
      <MDBContainer className='ps-2 pb-2 pe-2'>
        <h6 className='mb-2 about-content-header'>Gender</h6>
        {props.currentUserId === props.userId && !props.profile.gender &&
          <AddGender
            userId={props.userId}
            updateProfile={updateProfile}
            showToast={() => setShowErrorToast(true)}
          />
        }
        {props.currentUserId !== props.userId && !props.profile.gender &&
          <div className='d-flex flex-row align-items-center'>
            <MDBIcon fas icon='user' size='lg' />
          <div className='d-flex flex-column ms-3 flex-grow-1'>
            <p className='m-0'>No gender to show</p>
          </div>
        </div>
        }

        {props.profile.gender &&
          <EditGender
            currentUserId={props.currentUserId}
            userId={props.userId}
            gender={props.profile.gender}
            updateProfile={updateProfile}
            showToast={() => setShowErrorToast(true)}
          />
        }
      </MDBContainer>
      <div className='mb-3'>
        <h5>Favorites</h5>
        {props.currentUserId === props.userId &&
          <AddFavorite
            userId={props.userId}
            updateProfile={updateProfile}
            showToast={() => setShowErrorToast(true)}
            favorites={props.profile.interests.map(i => i ?? '')}
          />
        }
        {props.currentUserId !== props.userId && props.profile.interests.length === 0 &&
        <div className='d-flex flex-row align-items-center mb-3'>
          <MDBIcon fas icon='circle' />
          <p className='m-0 ms-3 flex-grow-1'>No favorite to show</p>
        </div>
        }

        {props.profile.interests.length > 0 && props.profile.interests.map((i, index) =>
        <EditFavorite
          key={index}
          currentUserId={props.currentUserId}
          userId={props.userId}
          favorite={i!}
          updateProfile={updateProfile}
          showToast={() => setShowErrorToast(true)}
          favorites={props.profile.interests.map(i => i ?? '')}
        />
        )}
      </div>
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

export default Info;
