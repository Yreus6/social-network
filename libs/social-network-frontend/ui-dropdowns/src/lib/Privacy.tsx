import React from 'react';
import { MDBDropdown, MDBDropdownItem, MDBDropdownLink, MDBDropdownMenu, MDBDropdownToggle } from 'mdb-react-ui-kit';

interface PrivacyProps {
  privacy: string;
  onSetPrivacy: (privacy: string) => void;
}

export const Privacy = (props: PrivacyProps) => {
  return (
    <MDBDropdown>
      <MDBDropdownToggle
        className='shadow-0'
        color='light'
        style={{ backgroundColor: '#DBE0E5' }}
        type='button'
      >
        {props.privacy}
      </MDBDropdownToggle>
      <MDBDropdownMenu>
        <MDBDropdownItem style={{ backgroundColor: 'unset' }}>
          <MDBDropdownLink
            tag='button'
            type='button'
            onClick={() => props.onSetPrivacy('PUBLIC')}
          >
            Public
          </MDBDropdownLink>
        </MDBDropdownItem>
        <MDBDropdownItem style={{ backgroundColor: 'unset' }}>
          <MDBDropdownLink
            tag='button'
            type='button'
            onClick={() => props.onSetPrivacy('FRIEND')}
          >
            Friend
          </MDBDropdownLink>
        </MDBDropdownItem>
        <MDBDropdownItem style={{ backgroundColor: 'unset' }}>
          <MDBDropdownLink
            tag='button'
            type='button'
            onClick={() => props.onSetPrivacy('PRIVATE')}
          >
            Private
          </MDBDropdownLink>
        </MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
  );
};
