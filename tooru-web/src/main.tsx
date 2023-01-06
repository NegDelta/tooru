import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  isRouteErrorResponse,
  RouteObject,
  RouterProvider,
  useRouteError
} from 'react-router-dom';

import routes from './routes';
import { Layout, View } from './Layout';
import './index.css';

const ErrorBoundary = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    const { error: errorData, status, statusText } = error;
    return (
      <>
        <h1>{status}</h1>
        <h2>{statusText}</h2>
        <div className='pre'>{JSON.stringify(errorData)}</div>
      </>
    );
  }
  return (
    <>
      <div className='pre'>{JSON.stringify(error)}</div>
    </>
  );
};

const ViewErrorBoundary = View(() => ({
  title: 'error',
  submenuEntries: [],
  content: <ErrorBoundary />
}));

const errorBoundaryRoute: RouteObject = {
  errorElement: <ViewErrorBoundary />,
  children: routes
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [errorBoundaryRoute]
  }
]);
const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
