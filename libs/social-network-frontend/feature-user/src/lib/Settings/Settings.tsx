import React, { useEffect, useState } from 'react';
import './Settings.scss';
import '../Page.scss';
import {
  MDBCol,
  MDBIcon,
  MDBRow,
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
  MDBToast
} from 'mdb-react-ui-kit';
import NameForm from './components/NameForm/NameForm';
import { FormWrapper } from '@sn-htc/social-network-frontend/ui-form';
import EmailForm from './components/EmailForm/EmailForm';
import PasswordForm from './components/PasswordForm/PasswordForm';
import Deactivation from './components/Deactivation/Deactivation';
import { useGetUserFromOktaQuery, User } from '@sn-htc/social-network-frontend/data-access-user';

interface SettingsProps {
  user: User;
}

export const Settings = (props: SettingsProps) => {
  const { refetch } = useGetUserFromOktaQuery();
  const [verticalActive, setVerticalActive] = useState<string>('general');
  const [displayName, setDisplayName] = useState<string>('');
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);

  const handleVerticalClick = (value: string) => {
    if (value === verticalActive) {
      return;
    }

    setVerticalActive(value);
  };

  useEffect(() => {
    const firstName = props.user.firstName;
    const lastName = props.user.lastName;
    const middleName = props.user.middleName ?? '';

    setDisplayName(`${firstName} ${lastName} ${middleName}`);
  }, []);

  useEffect(() => {
    if (showErrorToast) {
      setTimeout(() => {
        setShowErrorToast(false);
      }, 3000);
    }
  }, [showErrorToast]);

  const updateUser = async () => {
    await refetch();
  };

  return (
    <div className='setting'>
      <MDBRow className='m-0' style={{ height: '3.75rem' }} />
      <MDBRow className='m-0'>
        <MDBCol md='1' xl='2' sm='0' />
        <MDBCol md='10' xl='8' sm='12'>
          <MDBRow className='setting-card d-flex flex-row mt-4 ms-auto me-auto pe-2 ps-2 pt-4 pb-4'>
            <MDBCol className='setting-nav' sm='4'>
              <h3 className='setting-title'>Settings</h3>
              <MDBTabs className='flex-column'>
                <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleVerticalClick('general')} active={verticalActive === 'general'}>
                    <MDBIcon fas icon='cog' className='me-2' />
                    General
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleVerticalClick('security')} active={verticalActive === 'security'}>
                    <MDBIcon fas icon='shield-alt' className='me-2' />
                    Security
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleVerticalClick('information')} active={verticalActive === 'information'}>
                    <MDBIcon fas icon='info-circle' className='me-2' />
                    Your information
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>
            </MDBCol>
            <MDBCol className='setting-main ps-3' sm='8'>
              <MDBTabsContent>
                <MDBTabsPane
                  show={verticalActive === 'general'}
                  key={'general' + Math.random() * 100}>
                  <FormWrapper title='Name' description={displayName}>
                    <NameForm
                      userId={props.user.id!}
                      fname={props.user.firstName!}
                      lname={props.user.lastName!}
                      mname={props.user.middleName ?? ''}
                      updateUser={updateUser}
                      showToast={() => setShowErrorToast(true)} />
                  </FormWrapper>

                  <FormWrapper title='Email' description={props.user.email!}>
                    <EmailForm
                      userId={props.user.id!}
                      email={props.user.email!}
                      showToast={() => setShowErrorToast(true)} />
                  </FormWrapper>
                </MDBTabsPane>
                <MDBTabsPane
                  show={verticalActive === 'security'}
                  key={'security' + Math.random() * 100}>
                  <FormWrapper
                    title='Change Password'
                    description={'It\'s a good idea to use a strong password that you\'re not using elsewhere'}>
                    <PasswordForm
                      userId={props.user.id!}
                      showToast={() => setShowErrorToast(true)} />
                  </FormWrapper>

                  <div className='d-flex mb-4 flex-row align-items-center'>
                    <div className='flex-grow-1'>
                      <h3 className='mfa-title'>Two-factor Authentication</h3>
                      <p className='mfa-description'>We'll ask for a login code if we notice an attempted login from an unrecognized device or browser</p>
                    </div>
                    <a className='mfa-link'
                       target='_blank'
                       rel='noreferrer noopener'
                       href='https://login.htcompany.xyz/enduser/settings'
                    >Setup</a>
                  </div>
                </MDBTabsPane>
                <MDBTabsPane
                  show={verticalActive === 'information'}
                  key={'information' + Math.random() * 100}>
                  <Deactivation userId={props.user.id!} />
                </MDBTabsPane>
              </MDBTabsContent>
            </MDBCol>
          </MDBRow>
        </MDBCol>
        <MDBCol md='1' xl='2' sm='0' />
      </MDBRow>
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
        bodyContent='An error occurred. Please ensure you provide correct information.'
      />
    </div>
  );
};
