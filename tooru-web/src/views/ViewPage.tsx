import React from 'react';
import { Page } from 'tooru-common';
import { PageRenderProps } from '@/types';
import { timeFormat } from '@/utils';
import { View } from '@/Layout';
import { getPageSubmenu } from './menus';
import { PageDetail } from '@/components/PageDetail';

const renderTime = (page: Page) =>
  ({
    ...page,
    rendered_time: timeFormat(page.time),
    rendered_edit_time: timeFormat(page.edit_time)
  } as PageRenderProps);

export const ViewPage = View<Page>((page) => {
  const pageProps = renderTime(page);
  return {
    title: 'page',
    submenuEntries: getPageSubmenu(page.id),
    content: <PageDetail {...pageProps} />
  };
});
