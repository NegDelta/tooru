import React from 'react';
import { useActionData } from 'react-router-dom';
import { tooruwebDebug } from '@/utils';
import { View } from '@/Layout';
import { FormJsonUpload } from '@/components/FormJsonUpload';
import { FormJsonToActions, FormJsonToActionsProps } from '@/components/FormJsonToActions';

const debug = tooruwebDebug('view:jsonupload');

export const ViewJsonUpload = View(() => {
  const submitResult = useActionData() as FormJsonToActionsProps | undefined;
  debug('got submit result', submitResult);

  return {
    title: 'upload pages',
    submenuEntries: [],
    content: submitResult ? <FormJsonToActions {...submitResult} /> : <FormJsonUpload />
  };
});
