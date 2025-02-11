import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// import { ReactDOM } from 'react-dom/client';
import {
  /* BrowserRouter, */
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import App from './App.tsx';
import HomePageComponent from './pages/home/index.tsx';
import LoginPageComponent from './pages/login/index.tsx';

import './index.css';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePageComponent /> },
      { path: '/login', element: <LoginPageComponent /> },
      {},
    ],
    errorElement: <div>404 Not Found (Component to be Created)</div>,
  },
];
const router = createBrowserRouter(routes);

// Explanation:
// react-router-dom is used for routing in React applications.
// BrowserRouter is a wrapper that enables routing in your application.
// Wrapping the App component with BrowserRouter here ensures that routing is enabled throughout your entire application.
// StrictMode is a tool for highlighting potential problems in an application.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
