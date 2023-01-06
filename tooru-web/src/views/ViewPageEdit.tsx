import React from 'react';
import { Page } from 'tooru-common';
import { getPath } from '@/utils';
import { View } from '@/Layout';
import { getPageSubmenu } from './menus';
import { FormPageEdit } from '@/components/FormPageEdit';

export const ViewPageEdit = View<Page>((page) => {
  return {
    title: 'edit page',
    submenuEntries: getPageSubmenu(page.id),
    content: <FormPageEdit pageFields={page} target={getPath('pages', page.id, 'edit')} />
  };
});
