import React from 'react';
import { Page } from 'tooru-common';
import { getRestPathQuery } from '@/utils';
import { View } from '@/Layout';
import { PageCollection } from '@/components/PageCollection';

export const ViewAllPages = View<Page[]>((loadedPages) => ({
  title: 'all pages',
  submenuEntries: [{ text: 'download', path: getRestPathQuery({ dl: '1' }, '/pages'), external: true }],
  content: <PageCollection pages={loadedPages} />
}));
