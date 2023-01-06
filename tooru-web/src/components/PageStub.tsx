import React from 'react';
import { Link } from 'react-router-dom';
import { timeFormat } from '@/utils';

interface PageStubProps {
  id: string;
  title: string;
  lead: string;
  body: string;
  time: number;
}

export const PageStub = ({ id, title, lead, body, time }: PageStubProps) => {
  const renderedTime = timeFormat(time.toString());
  return (
    <div className='pagestub'>
      <Link to={'/pages/' + id + '/'}>
        <p className='aside'>{renderedTime}</p>
        <h1>{title}</h1>
        <p className='lead'>{lead}</p>
        <p>{body}</p>
      </Link>
    </div>
  );
};
