import React from 'react';
import { PageRenderProps } from '@/types';

export const PageDetail = (props: PageRenderProps) => {
  const { title, lead, body, rendered_time, rendered_edit_time, id, time, edit_time } = props;
  return (
    <>
      <h1>{title}</h1>
      <p className='aside'>
        {rendered_time}
        {time != edit_time && <> • Edit: {rendered_edit_time}</>} • # {id}
      </p>
      <p className='lead'>{lead}</p>
      <p>{body}</p>
    </>
  );
};
