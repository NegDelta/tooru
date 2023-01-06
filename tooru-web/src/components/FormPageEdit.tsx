import React from 'react';
import { Form } from 'react-router-dom';
import { PagePostRequest } from 'tooru-common';
import { getPath } from '@/utils';

interface FormPageEditProps {
  pageFields?: PagePostRequest;
  target: string;
}

export const FormPageEdit = ({ pageFields, target }: FormPageEditProps) => {
  return (
    <Form action={getPath(target + '/')} method='post' id='newpage'>
      <p>
        <label htmlFor='title'>Title:</label>
        <textarea name='title' id='title' maxLength={80}>
          {pageFields?.title}
        </textarea>
      </p>
      <p>
        <label htmlFor='lead'>Lead:</label>
        <textarea name='lead' id='lead' maxLength={280}>
          {pageFields?.lead}
        </textarea>
      </p>
      <p>
        <label htmlFor='body'>Body:</label>
        <textarea name='body' id='body'>
          {pageFields?.body}
        </textarea>
      </p>
      <p>
        <button type='submit' id='submit'>
          Post
        </button>
      </p>
    </Form>
  );
};
