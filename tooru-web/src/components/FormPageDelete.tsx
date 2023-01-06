import React from 'react';
import { Form } from 'react-router-dom';
import { Page } from 'tooru-common';
import { getPath } from '@/utils';

export const FormPageDelete = (page: Page) => (
  <>
    <p className='aside'>{page.id}</p>
    <h1>Confirm page deletion</h1>
    <p>This action cannot be reversed.</p>
    <Form action={getPath('pages/' + page.id + '/delete/')} method='post' id='delpage'>
      <button
        type='button'
        onClick={() => {
          window.location.href = getPath('pages/' + page.id);
        }}
      >
        Cancel
      </button>
      <button type='submit' id='submit' className='destroy'>
        Delete
      </button>
    </Form>
  </>
);
