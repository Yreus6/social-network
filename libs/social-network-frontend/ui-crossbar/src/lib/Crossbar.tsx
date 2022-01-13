import React from 'react';
import './Crossbar.scss';
import {
  MDBBadge,
  MDBContainer,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav
} from 'mdb-react-ui-kit';
import logo from './assets/logo.png';
import { useHistory, useLocation } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

interface CrossbarProps {
  avatar: string;
}

export const Crossbar = (props: CrossbarProps) => {
  const { oktaAuth } = useOktaAuth();
  const history = useHistory();
  const location = useLocation();

  return (
    <MDBNavbar className='sticky-top' bgColor='light' expand='sm' light>
      <MDBContainer fluid className='m-0 p-0'>
        <MDBNavbarBrand
          style={{ cursor: 'pointer' }}
          onClick={() => history.push('/')}
        >
          <img src={logo} className='logo ms-4' height={40} alt='logo' />
        </MDBNavbarBrand>
      </MDBContainer>
      <MDBContainer fluid className='m-0 p-0'>
        <MDBNavbarNav className='d-flex justify-content-around flex-row'>
          <MDBNavbarItem>
            <MDBNavbarLink
              style={{ cursor: 'pointer' }}
              onClick={() => history.push('/friends', { refresh: true })}
              active={location.pathname === '/friends'}
            >
              <MDBIcon fas icon='user-friends' size='lg' />
            </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink
              style={{ cursor: 'pointer' }}
              onClick={() => history.push('/', { refresh: true })}
              active={location.pathname === '/'}
            >
              <MDBIcon fas icon='home' size='lg' />
            </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink
              style={{ cursor: 'pointer' }}
            >
              <MDBIcon fas icon='comments' size='lg' />
            </MDBNavbarLink>
          </MDBNavbarItem>
        </MDBNavbarNav>
      </MDBContainer>
      <MDBContainer fluid className='d-flex justify-content-end me-2 m-0 p-0'>
        <MDBNavbarLink
          style={{ cursor: 'pointer' }}
          onClick={() => history.push('/profile', { refresh: true })}
        >
          <div className='bg-image hover-overlay'>
            <img
              src={props.avatar}
              className='rounded-circle'
              height={30}
              width={30}
              alt='Avatar'
            />
          </div>
        </MDBNavbarLink>
        <div>
          <span>
            <MDBIcon fas icon='globe' size='lg' />
          </span>
          <MDBBadge pill color='danger'>
            !
          </MDBBadge>
        </div>
        <MDBDropdown
          data-test='dropdown-btn'
          options={{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [-10, 24]
                }
              }
            ]
          }}
        >
          <MDBDropdownToggle className='btn-light btn-floating shadow-0 ms-1 me-1'>
            <MDBIcon fas icon='caret-down' />
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem style={{ backgroundColor: 'unset' }}>
              <MDBDropdownLink
                tag='button'
                type='button'
                onClick={() => history.push('/settings')}
              >
                Settings
              </MDBDropdownLink>
            </MDBDropdownItem>
            <MDBDropdownItem>
              <MDBDropdownLink
                data-test='logout-btn'
                tag='button'
                type='button'
                onClick={() => oktaAuth.signOut()}
              >
                Logout
              </MDBDropdownLink>
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBContainer>
    </MDBNavbar>
  );
};
