import { getPath, getRestPathQuery } from '@/utils';
import { MenuEntry } from '@/Layout';

export const getPageSubmenu = (id: string): MenuEntry[] => [
  { text: 'edit', path: getPath('pages/', id, 'edit/') },
  { text: 'delete', path: getPath('pages/', id, 'delete/') },
  { text: 'download', path: getRestPathQuery({ dl: '1' }, '/pages/', id), external: true }
];
