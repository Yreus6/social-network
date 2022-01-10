import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import './Deactivation.scss';
import { useDeactivateUserMutation } from '@sn-htc/social-network-frontend/data-access-user';
import { useOktaAuth } from '@okta/okta-react';

interface DeactivationProps {
  userId: string;
}

const Deactivation = (props: DeactivationProps) => {
  const { oktaAuth } = useOktaAuth();
  const [deactivate, { isLoading: isUpdating } ] = useDeactivateUserMutation();

  const handleDeactivate = async () => {
    await deactivate({userId: props.userId}).unwrap();
    await oktaAuth.signOut({
      revokeAccessToken: true,
      revokeRefreshToken: true
    });
  };

  return (
    <div className='d-flex flex-row align-items-center'>
      <div className='flex-grow-1'>
        <h3 className='deactivation-title'>Deactivation</h3>
        <p className='deactivation-description'>Temporarily deactivate your account</p>
      </div>
      <MDBBtn className='deactivation-button' onClick={handleDeactivate} disabled={isUpdating}>Deactivate</MDBBtn>
    </div>
  );
};

export default Deactivation;
