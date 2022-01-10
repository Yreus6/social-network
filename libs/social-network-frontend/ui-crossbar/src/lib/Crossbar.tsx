import React from 'react';
import './Crossbar.scss';
import { MDBIcon, MDBInput } from 'mdb-react-ui-kit';

export const Crossbar = () => {
  return (
    <div className='crossbar m-0'>
      <MDBIcon fas icon='search' className='crossbar-search-icon' />
      <MDBInput type='text' label='Search' />
    </div>
  );
};
