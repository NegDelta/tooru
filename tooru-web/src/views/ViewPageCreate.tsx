import React from 'react';
import { Page } from 'tooru-common';
import { getPath } from '@/utils';
import { View } from '@/Layout';
import { FormPageEdit } from '@/components/FormPageEdit';

export const ViewPageCreate = View<Page>(() => {
  return {
    title: 'new page',
    submenuEntries: [],
    content: <FormPageEdit target={getPath('pages/new')} />
  };
});
