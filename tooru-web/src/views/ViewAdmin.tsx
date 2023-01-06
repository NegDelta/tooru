import React from 'react';
import { View } from '@/Layout';
import AdminDump from '@/components/AdminDump';

export const ViewAdmin = View(() => ({
  title: 'admin',
  submenuEntries: [],
  content: <AdminDump />
}));
