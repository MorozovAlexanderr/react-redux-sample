import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { worker } from './api/server/browser';
import { BrowserRouter } from 'react-router-dom';

worker.start();

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
