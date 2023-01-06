import { Page } from 'tooru-common';

export interface PageRenderProps extends Page {
  rendered_time: string;
  rendered_edit_time: string;
}

export interface JsonUploadFormFields {
  // TODO: reconcile with new structure, AFTER some backend logic appears
  uploadfile: File;
}
