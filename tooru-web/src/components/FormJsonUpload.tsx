import React from 'react';
import { Form } from 'react-router-dom';
import { getPath } from '@/utils';

export const FormJsonUpload = () => {
  return (
    <Form action={getPath('upload')} encType='multipart/form-data' method='post' id='newpage'>
      <p>
        <label htmlFor='file'>Submit file:</label>
        <input type='file' name='uploadfile' id='file' />
        <button type='submit' id='submit' className='inline'>
          Upload
        </button>
      </p>
    </Form>
  );
};
