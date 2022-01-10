import React from 'react';
import './Page.scss';
import { Sidenav } from '@sn-htc/social-network-frontend/ui-sidenav';
import { Crossbar } from '@sn-htc/social-network-frontend/ui-crossbar';

export const Page = (props: React.PropsWithChildren<unknown>) => {
  return (
    <div className='page d-flex flex-row'>
      <Sidenav avatar='https://i.pravatar.cc/300' />
      <div className='d-flex flex-column flex-grow-1'>
        <Crossbar />
        {props.children}
      </div>
    </div>
  );
};
