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

interface CrossbarProps {
  avatar: string;
}

export const Crossbar = (props: CrossbarProps) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <MDBNavbar className='sticky-top' bgColor='light' expand='sm' light>
      <MDBContainer fluid>
        <MDBNavbarBrand
          style={{ cursor: 'pointer' }}
          onClick={() => history.push('/')}
        >
          <img src={logo} className='logo ms-2' height={40} alt='logo' />
        </MDBNavbarBrand>
      </MDBContainer>
      <MDBContainer fluid>
        <MDBNavbarNav className='d-flex justify-content-around'>
          <MDBNavbarItem>
            <MDBNavbarLink
              style={{ cursor: 'pointer' }}
              onClick={() => history.push('/friends/requests')}
              active={location.pathname === '/friends/requests'}
            >
              <MDBIcon fas icon='user-friends' size='lg' />
            </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink
              style={{ cursor: 'pointer' }}
              onClick={() => history.push('/')}
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
      <MDBContainer fluid className='d-flex justify-content-end me-2'>
        <MDBNavbarLink
          style={{ cursor: 'pointer' }}
          onClick={() => history.push('/profile')}
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
          options={{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [10, 20]
                }
              }
            ]
          }}
        >
          <MDBDropdownToggle className='btn-light btn-floating shadow-0 ms-1 me-1'>
            <MDBIcon fas icon='caret-down' />
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem>
              <MDBDropdownLink href='#'>Action</MDBDropdownLink>
            </MDBDropdownItem>
            <MDBDropdownItem>
              <MDBDropdownLink href='#'>Another action</MDBDropdownLink>
            </MDBDropdownItem>
            <MDBDropdownItem>
              <MDBDropdownLink href='#'>Something else here</MDBDropdownLink>
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBContainer>
    </MDBNavbar>
  );
};
