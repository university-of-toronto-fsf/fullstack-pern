import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// import { ReactDOM } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import './index.css';

// Explanation:
// react-router-dom is used for routing in React applications.
// BrowserRouter is a wrapper that enables routing in your application.
// Wrapping the App component with BrowserRouter here ensures that routing is enabled throughout your entire application.
// StrictMode is a tool for highlighting potential problems in an application.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
