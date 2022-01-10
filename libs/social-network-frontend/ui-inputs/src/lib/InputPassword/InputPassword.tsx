import React, { useState } from 'react';
import { MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import './InputPassword.scss';

export const InputPassword = (props) => {
  const [showPasswordText, setShowPasswordText] = useState<boolean>(false);

  const toggleShowPassword = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowPasswordText(prev => !prev);
  };

  return (
    <MDBInput type={showPasswordText ? 'text' : 'password'} {...props}>
      <MDBIcon onClick={toggleShowPassword} far
               icon={showPasswordText ? 'eye-slash' : 'eye'} />
    </MDBInput>
  );
};
