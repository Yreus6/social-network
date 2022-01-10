import React, { useState } from 'react';
import './Sidenav.scss';
import logo from './assets/logo.png';
import socivioLogo from './assets/socivioLogo.png';
import { MDBSideNav, MDBSideNavItem, MDBSideNavLink, MDBSideNavMenu } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

interface SidenavProps {
  avatar?: string;
}

export const Sidenav = (props: SidenavProps) => {
  const [slimMode, setSlimMode] = useState<boolean | undefined>(true);
  let mouseoutSideNav = true;

  return (
    <MDBSideNav
      isOpen={true}
      backdrop={false}
      slim={slimMode}
      slimCollapsed={true}
      constant={true}
      className='sidenav'
      closeOnEsc={false}
      onMouseOver={() => {
        mouseoutSideNav = false;
        setTimeout(() => {
          setSlimMode(false);
        }, 200);
      }}
      onMouseOut={() => {
        mouseoutSideNav = true;
        setTimeout(() => {
          if (mouseoutSideNav) {
            setSlimMode(true);
          }
        }, 200);
      }}
    >
      <a className='sidenav-header'>
        <img src={logo} className='logo' alt='logo' />
        <img src={socivioLogo} className='socivioLogo' alt='logo' />
      </a>
      <div className='sidenav-main'>
        <MDBSideNavMenu>
          <MDBSideNavItem className='sidenav-item'>
            <Link to='/' className='sidenav-link'>
              <i className='icon home-outline-icon' />
              <span className='sidenav-non-slim'>Home</span>
            </Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <MDBSideNavLink>
              <i className='icon bell-outline-icon' />
              <span className='sidenav-non-slim'>Notification</span>
            </MDBSideNavLink>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <MDBSideNavLink>
              <i className='icon communication-outline-icon' />
              <span className='sidenav-non-slim'>Message</span>
            </MDBSideNavLink>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <MDBSideNavLink>
              <i className="icon friend-outline-icon"/>
              <span className="sidenav-non-slim">Friends</span>
            </MDBSideNavLink>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to='/profile' className='sidenav-link'>
              <i className='icon personal-outline-icon' />
              <span className='sidenav-non-slim'>Profile</span>
            </Link>
          </MDBSideNavItem>
        </MDBSideNavMenu>
      </div>
      <div className='sidenav-footer'>
        <MDBSideNavMenu>
          <MDBSideNavItem>
            <Link to='/settings' className='sidenav-link'>
              <i className='icon setting-outline-icon' />
              <span className='sidenav-non-slim'>Settings</span>
            </Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <MDBSideNavLink className='sidenav-avatar'>
              <img src={props.avatar} alt='avatar' />
              <span className='sidenav-non-slim'>User name</span>
            </MDBSideNavLink>
          </MDBSideNavItem>
        </MDBSideNavMenu>
      </div>
    </MDBSideNav>
  );
};
