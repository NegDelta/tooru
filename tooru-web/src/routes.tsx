import React from 'react';
import { LoaderFunctionArgs, redirect, RouteObject } from 'react-router-dom';

import { Page, PageJsonParseResult, PagePostRequest } from 'tooru-common';
import { JsonUploadFormFields } from './types';
import { parseRequestForm, getPath } from './utils';
import restApi from './rest';
import {
  ViewAllPages,
  ViewAdmin,
  ViewPage,
  ViewPageCreate,
  ViewPageEdit,
  ViewPageDelete,
  ViewJsonUpload
} from './views';
import { FormJsonToActionsProps } from './components/FormJsonToActions';

const pageLoader = async ({ params }: LoaderFunctionArgs) => {
  return (await restApi.getPage(params.id ?? '')) as Page;
};

const routes: RouteObject[] = [
  {
    index: true,
    element: <ViewAllPages />,
    loader: async () => {
      return (await restApi.getPages()) as Page[];
    }
  },
  {
    path: '/pages/new/',
    element: <ViewPageCreate />,
    action: async ({ request }) => {
      const fields = await parseRequestForm<PagePostRequest>(request);
      const newId: string = await restApi.postNewPage(fields);
      return redirect(getPath('/pages/', newId, '/'));
    }
  },
  {
    path: '/admin/',
    element: <ViewAdmin />
  },
  {
    path: '/upload/',
    element: <ViewJsonUpload />,
    action: async ({ request }) => {
      const { uploadfile } = await parseRequestForm<JsonUploadFormFields>(request);
      const uploadedText = await uploadfile.text();
      const filename = uploadfile.name;
      const parseResult: PageJsonParseResult = await restApi.postParse(uploadedText);
      const props: FormJsonToActionsProps = { parseResult, filename };
      return props;
    }
  },
  {
    path: '/pages/:id/',
    element: <ViewPage />,
    loader: pageLoader
  },
  {
    path: '/pages/:id/edit/',
    element: <ViewPageEdit />,
    loader: pageLoader,
    action: async ({ params, request }) => {
      const fields = await parseRequestForm<PagePostRequest>(request);
      const id = params.id ?? '';
      await restApi.putPage(id, fields);
      return redirect(getPath('/pages/', id, '/'));
    }
  },
  {
    path: '/pages/:id/delete/',
    element: <ViewPageDelete />,
    loader: pageLoader,
    action: async ({ params }) => {
      const id = params.id ?? '';
      await restApi.deletePage(id);
      return redirect(getPath('/'));
    }
  }
];

export default routes;
