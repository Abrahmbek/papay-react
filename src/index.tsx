import React from 'react';
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import {Provider} from "react-redux";
import './index.tsx';
import App from './app/App.tsx';
import reportWebVitals from "./reportWebVitals.ts"

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './app/MaterialTheme/index.ts';
import { store } from './app/store.ts';

import {SocketContext, socket } from "./app/context/socket.js"

// const container = document.getElementById("root")!;
// const root = createRoot(container);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
       <SocketContext.Provider value={socket}>
        <App/>
      </SocketContext.Provider>
     </ThemeProvider>
     </Provider>
  </React.StrictMode>,
   document.getElementById("root")
);


reportWebVitals();

