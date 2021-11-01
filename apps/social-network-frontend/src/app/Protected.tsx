import React from 'react';
import { useGreetingQuery } from '@sn-htc/social-network-frontend/data-access-home';

const Protected = () => {
  const { data, error, isLoading } = useGreetingQuery();

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      {isLoading ?
        <h1>Loading...</h1> :
        data && <h1>{data.greeting}</h1>
      }
    </div>
  );
};

export default Protected;
