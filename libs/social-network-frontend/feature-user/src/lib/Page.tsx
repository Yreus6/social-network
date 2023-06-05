import React from 'react';
import './Page.scss';
import { Crossbar } from '@sn-htc/social-network-frontend/ui-crossbar';

export const Page = (props: React.PropsWithChildren<unknown>) => {
  return (
    <div className='page d-flex flex-row'>
      <div className='d-flex flex-column flex-grow-1'>
        <Crossbar avatar='https://i.pravatar.cc/300' />
        {props.children}
      </div>
    </div>
  );
};
