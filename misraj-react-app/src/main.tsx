import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './styles.css';
import { SnackbarProvider } from './app/components/ctx/SnackbarContext';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <BrowserRouter>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </StrictMode>
  </QueryClientProvider>
);
