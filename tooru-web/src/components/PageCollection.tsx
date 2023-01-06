import React from 'react';
import { Page } from 'tooru-common';
import { tooruwebDebug } from '@/utils';
import { PageStub } from './PageStub';

const debug = tooruwebDebug('ui:PageCollection');

interface PageCollectionProps {
  pages: Page[];
}

export const PageCollection = (props: PageCollectionProps) => {
  const { pages } = props;
  debug('got props:', props);
  if (!pages || pages.length === 0) {
    return <p>No content.</p>;
  }
  return (
    <>
      {pages.map((page) => (
        <PageStub id={page.id} title={page.title} lead={page.lead} body={page.body} time={Number(page.time)} />
      ))}
    </>
  );
};
