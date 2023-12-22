import React from 'react';
import { createRoot } from 'react-dom/client';
import {Provider} from "react-redux";
import './index.tsx';
import App from './app/App.tsx';
import reportWebVitals from "./reportWebVitals.ts"

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './app/MaterialTheme/index.ts';
import { store } from './app/store.ts';

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
       <App/>
     </ThemeProvider>
     </Provider>
  </React.StrictMode>
);


reportWebVitals();

