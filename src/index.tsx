import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.tsx';
import Home from './home.tsx';
import App from './app/App.tsx';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './app/MaterialTheme/index.ts';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
      <CssBaseline />
       <App/>
     </ThemeProvider>
  </React.StrictMode>
);




