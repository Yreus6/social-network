import React from 'react';
import { useGetGreetingTextQuery } from '@sn-htc/social-network-frontend/data-access-home';
import { AxiosBaseQueryError } from '@sn-htc/shared/data-access';

const Protected = () => {
  const { data, error, isLoading } = useGetGreetingTextQuery();

  if (error) {
    const err = error as AxiosBaseQueryError;

    if (err.status === 401) {
      return <h1>Unauthorized</h1>;
    } else if (err.status === 403) {
      return <h1>Forbidden</h1>;
    }

    return <h1>Error!</h1>;
  }

  return (
    <div>
      {isLoading ?
        <h1>Loading...</h1> :
        data && <h1>{data.content}</h1>
      }
    </div>
  );
};

export default Protected;
