import React from 'react';
import { Page } from 'tooru-common';
import { View } from '@/Layout';
import { getPageSubmenu } from './menus';
import { FormPageDelete } from '@/components/FormPageDelete';

export const ViewPageDelete = View<Page>((page) => {
  return {
    title: 'delete page',
    submenuEntries: getPageSubmenu(page.id),
    content: <FormPageDelete {...page} />
  };
});
