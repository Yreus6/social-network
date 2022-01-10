import React, { useEffect, useState } from 'react';
import './FormWrapper.scss';

interface FormWrapperProps {
  title: string;
  description: string;
}

export const FormWrapper = (props: React.PropsWithChildren<FormWrapperProps>) => {
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const toggleShow = (): void => {
    setShowEdit(pre => !pre);
  };

  useEffect(() => {
    return () => {
      setShowEdit(false);
    };
  }, []);

  return (
    <div className='form-wrapper pe-2'>
      <div className='d-flex flex-row align-items-center'>
        <div className='flex-grow-1'>
          <h3 className='form-title'>{props.title}</h3>
          <p className='form-description'>{props.description}</p>
        </div>
        {
          !showEdit && <a className='link-primary' onClick={toggleShow}>Edit</a>
        }
      </div>
      {
        showEdit && React.isValidElement(props.children) &&
        React.cloneElement(props.children, {onCancel: toggleShow})
      }
    </div>
  );
};
