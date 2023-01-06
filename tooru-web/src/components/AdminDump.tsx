import React from 'react';
import { cfg } from '@/globals';

const AdminDump = () => (
  <>
    <h1>Config</h1>
    <p>{JSON.stringify(cfg)}</p>
  </>
);

export default AdminDump;
