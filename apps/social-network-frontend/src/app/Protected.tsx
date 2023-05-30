import React from 'react';
import { useGetGreetingTextQuery } from '@sn-htc/social-network-frontend/data-access-home';
import { AxiosBaseQueryError, ErrorResponse } from '@sn-htc/shared/data-access';

const Protected = () => {
  const { data, error, isLoading } = useGetGreetingTextQuery();

  if (error) {
    const err = error as AxiosBaseQueryError;
    const detail = (err.data as unknown as ErrorResponse).detail;

    return <h1>{detail}</h1>;
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
